#!/usr/bin/env python3
"""
Balatro Odyssey Wiki — Data Extraction Script
Reads mod Lua localization files and joker source files to generate src/data/*.json
Usage: MOD_REPO=../balatro-odyssey python3 scripts/extract_data.py
"""

import os
import re
import json
from pathlib import Path

MOD_REPO = Path(os.environ.get("MOD_REPO", "../balatro-odyssey"))
OUTPUT_DIR = Path(__file__).parent.parent / "src" / "data"
ASSETS_2X = MOD_REPO / "assets" / "2x"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── Lua parser helpers ───────────────────────────────────────────────────────

def parse_lua_string(s: str) -> str:
    """Unescape Lua string content."""
    return s.replace('\\"', '"').replace("\\'", "'").replace("\\\\", "\\").replace("\\n", "\n")

def parse_text_array(raw: str) -> list[str]:
    """
    Parse a Lua array like: { "line1", "line2", "#1# text" }
    Returns a list of strings.
    """
    lines = []
    # Extract from curly braces
    m = re.search(r'\{(.*)\}', raw, re.DOTALL)
    if not m:
        return lines
    inner = m.group(1)
    # Find all quoted strings (handle escaped quotes)
    for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', inner):
        lines.append(parse_lua_string(m.group(1)))
    return lines

def parse_localization_file(path: Path) -> dict:
    """
    Parse a Balatro Odyssey localization Lua file.
    Returns: {section: {key: {name, text}}}
    e.g. {"Joker": {"j_odyssey_j_foo_bar": {"name": "Foo Bar", "text": [...]}}}
    """
    content = path.read_text(encoding="utf-8")
    result = {}

    # Detect current section
    # The file structure is: descriptions = { Joker = { ... }, Tarot = { ... }, ... }
    # We split by known section headers
    section_pattern = re.compile(r'\b(Joker|Tarot|Planet|Spectral|Voucher|Enhanced|Back|Blind|Hand)\s*=\s*\{', re.MULTILINE)

    sections = list(section_pattern.finditer(content))
    for i, sm in enumerate(sections):
        section_name = sm.group(1)
        start = sm.end()
        end = sections[i + 1].start() if i + 1 < len(sections) else len(content)
        section_content = content[start:end]
        result[section_name] = parse_section(section_content)

    return result

def parse_section(text: str) -> dict:
    """
    Parse entries within a section like:
      key = { name = "...", text = { ... } }
    """
    entries = {}

    # Match entries: key = { name = "...", text = { ... } }
    # We use a simple state machine approach
    # First normalize: collapse entries that span multiple lines into single lines
    # then find patterns

    # Pattern for compact single-line entry
    compact_pattern = re.compile(
        r'(\w+)\s*=\s*\{\s*name\s*=\s*"((?:[^"\\]|\\.)*)"\s*,\s*text\s*=\s*(\{[^}]*(?:\{[^}]*\}[^}]*)?\})',
        re.DOTALL
    )

    # Pattern for multi-line entry
    # key = {\n  name = "...",\n  text = {\n  ...\n  }\n}
    # We'll use a bracket-counting approach

    pos = 0
    while pos < len(text):
        # Find next key = { — supports both plain keys and ["key"] bracket notation
        m = re.search(r'(?:\["([^"]+)"\]|(\w+))\s*=\s*\{', text[pos:])
        if not m:
            break
        key = m.group(1) if m.group(1) else m.group(2)
        if key in ('name', 'text', 'descriptions', 'misc', 'poker_hands', 'poker_hand_descriptions', 'dictionary'):
            pos += m.end()
            continue

        brace_start = pos + m.end() - 1  # position of {
        # Count braces to find matching }
        depth = 0
        i = brace_start
        while i < len(text):
            if text[i] == '{':
                depth += 1
            elif text[i] == '}':
                depth -= 1
                if depth == 0:
                    break
            elif text[i] == '"':
                # Skip string
                i += 1
                while i < len(text) and text[i] != '"':
                    if text[i] == '\\':
                        i += 1
                    i += 1
            i += 1

        entry_text = text[brace_start:i + 1]

        # Extract name
        name_m = re.search(r'name\s*=\s*"((?:[^"\\]|\\.)*)"', entry_text)
        name = parse_lua_string(name_m.group(1)) if name_m else ""

        # Extract text array
        text_m = re.search(r'text\s*=\s*(\{(?:[^{}]|\{[^{}]*\})*\})', entry_text, re.DOTALL)
        lines = parse_text_array(text_m.group(1)) if text_m else []

        # Build full key with odyssey prefix based on context
        if name:
            entries[key] = {"name": name, "text": lines}

        pos += m.end()

    return entries


# ─── Joker rarity/cost extraction ────────────────────────────────────────────

# Keys prefixed with "_" to avoid "uncommon".endswith("common") false-positive
RARITY_MAP = {"_uncommon": 2, "_common": 1, "_rare": 3, "_legendary": 4}

def extract_config_extra(block: str) -> dict:
    """
    Extract config.extra values from a SMODS.Joker block.
    Returns dict like {'mult': 12, 'chips': 50}.
    """
    extra = {}
    # Match: config = { extra = { key = value, ... } }
    # The extra block may be nested inside config
    config_m = re.search(r'\bconfig\s*=\s*\{', block)
    if not config_m:
        return extra
    # Find the config block contents
    start = config_m.end() - 1
    depth = 0
    i = start
    while i < len(block):
        if block[i] == '{': depth += 1
        elif block[i] == '}':
            depth -= 1
            if depth == 0: break
        i += 1
    config_block = block[start:i+1]

    extra_m = re.search(r'\bextra\s*=\s*\{([^}]+)\}', config_block)
    if not extra_m:
        return extra
    for kv in re.finditer(r'(\w+)\s*=\s*(-?[\d.]+)', extra_m.group(1)):
        val_str = kv.group(2)
        extra[kv.group(1)] = float(val_str) if '.' in val_str else int(val_str)
    return extra


def extract_loc_vars_order(block: str) -> list:
    """
    Parse loc_vars function to get the ordered list of extra field names.
    Handles both simple ('extra.field') and guarded ('((expr)).field') patterns.
    e.g. 'return { vars = { extra.mult, extra.chips } }' → ['mult', 'chips']
    e.g. 'return { vars = { ((...or self.config.extra)).x_mult } }' → ['x_mult']
    """
    # Find loc_vars function body
    lv_m = re.search(r'\bloc_vars\s*=\s*function\b', block)
    if not lv_m:
        return []
    # Extract from 'return { vars =' onwards until end of return statement
    rest = block[lv_m.start():]
    vars_m = re.search(r'\breturn\s*\{[^}]*vars\s*=\s*\{([^}]*)\}', rest, re.DOTALL)
    if not vars_m:
        return []
    vars_str = vars_m.group(1)
    # Try simple pattern first: extra.field_name
    fields = re.findall(r'\bextra\.(\w+)', vars_str)
    if fields:
        return fields
    # Fallback: guarded expressions like ((card.ability.extra or self.config.extra)).field_name
    # Each comma-separated element ends with .field_name
    fields = []
    for expr in vars_str.split(','):
        m = re.search(r'\.(\w+)\s*$', expr.strip())
        if m:
            fields.append(m.group(1))
    return fields


def extract_joker_metadata(joker_dir: Path) -> dict:
    """
    Parse all joker Lua files to extract rarity, cost, vars per key.
    Returns: {key: {rarity, cost, blueprint_compat, eternal_compat, vars}}

    Handles two file formats:
    1. Direct:  SMODS.Joker({ key='...', rarity=N, ... })
    2. Table:   local jokers = { { key='...', rarity=N }, ... }
                for _, j in ipairs(jokers) do SMODS.Joker(j) end
    """
    metadata = {}

    def _process_block(block: str, fallback_rarity: int):
        key_m = re.search(r"key\s*=\s*'([^']+)'", block)
        if not key_m:
            key_m = re.search(r'key\s*=\s*"([^"]+)"', block)
        if not key_m:
            return

        key = key_m.group(1)
        cost_m = re.search(r'\bcost\s*=\s*(\d+)', block)
        cost = int(cost_m.group(1)) if cost_m else 4

        rarity_m = re.search(r'\brarity\s*=\s*(\d+)', block)
        actual_rarity = int(rarity_m.group(1)) if rarity_m else fallback_rarity

        # Skip token jokers that cannot appear in pool (e.g. Post-Apocalypse)
        if re.search(r'in_pool\s*=\s*function\s*\(\s*\)\s*return\s+false', block):
            return

        bp_m = re.search(r'blueprint_compat\s*=\s*(true|false)', block)
        blueprint_compat = bp_m.group(1) == 'true' if bp_m else False
        et_m = re.search(r'eternal_compat\s*=\s*(true|false)', block)
        eternal_compat = et_m.group(1) == 'true' if et_m else False

        extra = extract_config_extra(block)
        fields_order = extract_loc_vars_order(block)
        vars_list: list = [extra.get(f) for f in fields_order]

        metadata[key] = {
            "rarity": actual_rarity,
            "cost": cost,
            "blueprint_compat": blueprint_compat,
            "eternal_compat": eternal_compat,
            "vars": vars_list,
        }

    def _extract_table_entries(content: str, fallback_rarity: int):
        """Extract joker blocks from `local jokers = { {...}, {...}, ... }` format."""
        # Must match at position 0 (start of file) to avoid false positives
        # from local variables inside functions (e.g. local right_jokers = {})
        table_m = re.search(r'^local\s+\w*jokers\s*=\s*\{', content, re.MULTILINE)
        if table_m and table_m.start() > 0:
            table_m = None
        if not table_m:
            return False
        start = table_m.end() - 1  # position of opening {
        # Find end of outer table
        depth = 0
        i = start
        while i < len(content):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
                if depth == 0:
                    break
            elif content[i] in ('"', "'"):
                q = content[i]
                i += 1
                while i < len(content) and content[i] != q:
                    if content[i] == '\\':
                        i += 1
                    i += 1
            i += 1
        outer = content[start + 1:i]  # contents between the outer { }

        # Now find each top-level { ... } entry
        j = 0
        while j < len(outer):
            if outer[j] == '{':
                depth = 0
                k = j
                while k < len(outer):
                    if outer[k] == '{':
                        depth += 1
                    elif outer[k] == '}':
                        depth -= 1
                        if depth == 0:
                            break
                    elif outer[k] in ('"', "'"):
                        q = outer[k]
                        k += 1
                        while k < len(outer) and outer[k] != q:
                            if outer[k] == '\\':
                                k += 1
                            k += 1
                    k += 1
                block = outer[j:k + 1]
                _process_block(block, fallback_rarity)
                j = k + 1
            else:
                j += 1
        return True

    for lua_file in sorted(joker_dir.glob("*.lua")):
        fname = lua_file.stem.lower()
        rarity = 1
        for rname, rval in RARITY_MAP.items():
            if fname.endswith(rname):
                rarity = rval
                break

        content = lua_file.read_text(encoding="utf-8")

        # Try format 2 first (local jokers = {...})
        if _extract_table_entries(content, rarity):
            continue

        # Format 1: SMODS.Joker({ ... })
        for m in re.finditer(r'SMODS\.Joker\s*\(\s*\{', content):
            start = m.end() - 1
            depth = 0
            i = start
            while i < len(content):
                if content[i] == '{':
                    depth += 1
                elif content[i] == '}':
                    depth -= 1
                    if depth == 0:
                        break
                elif content[i] == '"':
                    i += 1
                    while i < len(content) and content[i] != '"':
                        if content[i] == '\\':
                            i += 1
                        i += 1
                i += 1
            block = content[start:i + 1]
            _process_block(block, rarity)

    return metadata


# ─── Voucher tier detection ───────────────────────────────────────────────────

def extract_voucher_metadata(vouchers_lua: Path) -> dict:
    """
    Returns {key: {tier, pair_key, cost}} where tier=1 base, tier=2 upgrade.
    pair_key is the key of the paired voucher.
    """
    meta = {}
    content = vouchers_lua.read_text(encoding="utf-8")

    # Build list of (key, requires, cost) from SMODS.Voucher blocks
    vouchers_raw = []
    for m in re.finditer(r'SMODS\.Voucher\s*\{', content):
        start = m.end() - 1
        depth = 0
        i = start
        while i < len(content):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
                if depth == 0:
                    break
            elif content[i] == '"':
                i += 1
                while i < len(content) and content[i] != '"':
                    if content[i] == '\\':
                        i += 1
                    i += 1
            i += 1
        block = content[start:i + 1]

        key_m = re.search(r"key\s*=\s*'([^']+)'", block)
        if not key_m:
            key_m = re.search(r'key\s*=\s*"([^"]+)"', block)
        if not key_m:
            continue
        key = key_m.group(1)  # e.g. "telescope"

        cost_m = re.search(r'\bcost\s*=\s*(\d+)', block)
        cost = int(cost_m.group(1)) if cost_m else 10

        req_m = re.search(r"requires\s*=\s*\{[^}]*'([^']+)'", block)
        requires = req_m.group(1) if req_m else None  # e.g. "v_odyssey_telescope"

        vouchers_raw.append({"key": key, "requires": requires, "cost": cost})

    # Build pair map: base key → upgrade key (strip v_odyssey_ prefix)
    all_keys = {v["key"] for v in vouchers_raw}
    for v in vouchers_raw:
        if v["requires"]:
            base_key = v["requires"].replace("v_odyssey_", "")
            v["tier"] = 2
            v["pair_key"] = base_key
            # Set pair on base too
            for b in vouchers_raw:
                if b["key"] == base_key:
                    if "tier" not in b:
                        b["tier"] = 1
                    b.setdefault("pair_key", v["key"])
        else:
            v.setdefault("tier", 1)
            v.setdefault("pair_key", None)

    for v in vouchers_raw:
        meta[v["key"]] = {
            "tier": v.get("tier", 1),
            "pair_key": v.get("pair_key"),
            "cost": v["cost"],
        }

    return meta


# ─── Deck sprite slug from English name ──────────────────────────────────────

def deck_name_to_sprite_slug(name_en: str) -> str:
    """
    Convert English deck name to the sprite file slug.
    'Steel Deck' → 'steel', 'Dark Energy Deck' → 'dark_energy'
    """
    slug = name_en.lower()
    slug = re.sub(r'\s+deck$', '', slug)   # remove trailing ' deck'
    slug = re.sub(r'[\s&\-]+', '_', slug)  # spaces/& to underscore
    slug = re.sub(r"[^\w]", '', slug)       # remove non-alphanumeric
    slug = re.sub(r'_+', '_', slug).strip('_')
    return slug


# Manual overrides for deck keys where localization doesn't match sprite filenames
# (Some PT-key entries have wrong/untranslated English names in en-us.lua)
# Decks removed from the mod (still in loc files for legacy reasons) — exclude from wiki.
DECK_EXCLUDE: set[str] = {
    'dourado',   # Gold Deck — removed from the mod
    'vidro',     # Glass Deck — removed from the mod
    'pedra',     # Stone Deck — removed from the mod
    'aco',       # Steel Deck — removed from the mod
}

DECK_SPRITE_OVERRIDES: dict[str, str] = {
    'avareza':      'avarice',   # key "Greed Deck" — sprite uses avarice filename
    'selvagem':     'holy',      # key maps to Holy Deck
    'sorte':        'magic',     # key maps to Magic Deck
    'multiplicador':'ruby',      # key maps to Ruby Deck
    'bonus':        'emerald',   # key maps to Emerald Deck (sprite is odyssey_d_emerald.png)
}

# EN corrections: en-us.lua has untranslated Portuguese text in these deck entries.
# Remove entries here once the mod's en-us.lua is fixed.
DECK_EN_OVERRIDES: dict[str, dict] = {
    # ── Names ──────────────────────────────────────────────────────────────────
    # key          name_en (EN correct)
    'alpha':        {'name': 'Alpha Deck'},
    'arcane':       {'name': 'Arcane Deck'},
    'ghost':        {'name': 'Ghost Deck'},
    'spectral':     {'name': 'Spectral Deck'},
    'wrath':        {'name': 'Wrath Deck'},
    'sloth':        {'name': 'Sloth Deck'},
    'pride':        {'name': 'Pride Deck'},
    'omega':        {'name': 'Omega Deck'},
    'odyssey':      {'name': 'Odyssey Deck'},
    'fractal':      {'name': 'Fractal Deck'},
    'vampire':      {'name': 'Vampire Deck'},
    'radioactive':  {'name': 'Radioactive Deck'},
    'volcanic':     {'name': 'Volcanic Deck'},
    'oceanic':      {'name': 'Oceanic Deck'},
    'stellar':      {'name': 'Stellar Deck'},
    'mystic':       {'name': 'Mystic Deck'},
    'tech':         {'name': 'Tech Deck'},
    'mercenary':    {'name': 'Mercenary Deck'},
    'investor':     {'name': 'Investor Deck'},
    'lucky_ii':     {'name': 'Lucky II Deck'},
    'arthur':       {'name': 'King Arthur Deck'},
    'phoenix':      {'name': 'Phoenix Deck'},
    'chimera':      {'name': 'Chimera Deck'},
    'unicorn':      {'name': 'Unicorn Deck'},
    'titan':        {'name': 'Titan Deck'},
    # ── Names + Descriptions ───────────────────────────────────────────────────
    'wrath':        {'name': 'Wrath Deck',       'text': ['Discards cost $1. Hands give $1.']},
    'pride':        {'name': 'Pride Deck',        'text': ['Face cards give +30 Chips.']},
    'arcane':       {'name': 'Arcane Deck',       'text': ['Arcana Packs are free.']},
    'celestial':    {'name': 'Celestial Deck',    'text': ['Planet Packs are free.']},
    'spectral':     {'name': 'Spectral Deck',     'text': ['Spectral Packs are free.']},
    'standard':     {'name': 'Standard Deck',     'text': ['Standard Packs are free.']},
    'buffoon':      {'name': 'Buffoon Deck',      'text': ['Buffoon Packs are free.']},
    'behemoth':     {'name': 'Behemoth Deck',     'text': ['1-card hands give X5 Mult.']},
    'fractal':      {'name': 'Fractal Deck',      'text': ['Playing 5 identical cards', 'creates a copy in the deck.']},
    'ghost':        {'name': 'Ghost Deck',        'text': ['Played cards are not discarded', '(return to hand). -2 Hands.']},
    'vampire':      {'name': 'Vampire Deck',      'text': ['Destroys played cards to', 'gain permanent Mult.']},
    'radioactive':  {'name': 'Radioactive Deck',  'text': ['Cards in hand decay', '(change rank) each round.']},
    'volcanic':     {'name': 'Volcanic Deck',     'text': ['Discards entire hand after', 'playing. +$5 per hand.']},
    'oceanic':      {'name': 'Oceanic Deck',      'text': ['Only Black suits. Flush scores 2x.']},
    'lunar':        {'name': 'Lunar Deck',        'text': ['Moon phases affect scoring', '(4 round cycle).']},
    'stellar':      {'name': 'Stellar Deck',      'text': ['Starts with 5 random', 'Planet cards.']},
    'mystic':       {'name': 'Mystic Deck',       'text': ['Starts with 5 random', 'Tarot cards.']},
    'tech':         {'name': 'Tech Deck',         'text': ['Starts with $100.', 'Shops are 2x more expensive.']},
    'mercenary':    {'name': 'Mercenary Deck',    'text': ['Does not earn money from blinds.', 'Earn $5 per sold Joker.']},
    'investor':     {'name': 'Investor Deck',     'text': ['Interest has no limit.']},
    'lucky_ii':     {'name': 'Lucky II Deck',     'text': ['Probabilities are always 1 in 1', '(always hits). Enemies 4x Points.']},
    'arthur':       {'name': 'King Arthur Deck',  'text': ['Starts with Excalibur', '(Legendary Joker).']},
    'merlin':       {'name': 'Merlin Deck',       'text': ['Starts with 3 Potions', '(Consumables).']},
    'phoenix':      {'name': 'Phoenix Deck',      'text': ['If you die, reborn at Ante 1', 'with everything kept (once).']},
    'chimera':      {'name': 'Chimera Deck',      'text': ['Mixed deck of 4 different decks.']},
    'titan':        {'name': 'Titan Deck',        'text': ['Giant cards (occupy 2 hand slots).']},
    'odyssey':      {'name': 'Odyssey Deck',      'text': ["Starts with Legendary Joker", "'The Odyssey'."]},
    'sloth':        {'name': 'Sloth Deck',        'text': ['1 Hand/round. 0 Discards. X3 Mult.']},
    'omega':        {'name': 'Omega Deck',        'text': ['Only 10, J, Q, K, A.']},
    'alpha':        {'name': 'Alpha Deck',        'text': ['Only A, 2, 3, 4, 5.']},
}


# ─── Joker group/name extraction ─────────────────────────────────────────────

def joker_key_to_group_name(key: str):
    """
    key like "j_singularity_solitary" → group="singularity", name="solitary"
    key like "j_hand_and_discard_foo" → group="hand_and_discard", name="foo"
    """
    known_groups = [
        "singularity", "quantum", "temporal", "dimensions", "corruption",
        "chaos", "economy", "transformations", "luck_and_probability", "pos",
        "hand_and_discard", "elemental", "tribal", "social", "cond", "time",
        "paradox", "celestial", "anomaly", "glitch", "professions", "final",
        "probability",  # some files use probability instead of luck_and_probability
    ]
    # Strip "j_" prefix
    rest = key[2:] if key.startswith("j_") else key
    for g in sorted(known_groups, key=len, reverse=True):
        if rest.startswith(g + "_"):
            item_name = rest[len(g) + 1:]
            return g, item_name
    # Fallback: split on first underscore after j_
    parts = rest.split("_", 1)
    return parts[0], parts[1] if len(parts) > 1 else rest


# ─── Poker hands extraction ───────────────────────────────────────────────────

def _find_block_end(content: str, start: int) -> int:
    """Given index of opening '{', return index of matching '}'."""
    depth = 0
    i = start
    while i < len(content):
        c = content[i]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return i
        elif c in ('"', "'"):
            q = c
            i += 1
            while i < len(content) and content[i] != q:
                if content[i] == '\\':
                    i += 1
                i += 1
        i += 1
    return len(content) - 1


def parse_poker_hands_from_loc(content: str) -> tuple[dict, dict]:
    """
    Extracts name and description mappings from the misc.poker_hands /
    misc.poker_hand_descriptions sub-sections of a Balatro loc file.
    Returns (names_dict, descs_dict) keyed by 'odyssey_xxx'.
    """
    names: dict[str, str] = {}
    descs: dict[str, list[str]] = {}

    # Names: poker_hands = { ["odyssey_xxx"] = "Name", ... }
    ph_pos = content.find('poker_hands = {')
    if ph_pos != -1:
        brace = content.index('{', ph_pos)
        end = _find_block_end(content, brace)
        block = content[brace:end + 1]
        for m in re.finditer(r'\["(odyssey_[^"]+)"\]\s*=\s*"([^"]*)"', block):
            names[m.group(1)] = m.group(2)
        # Also handle single-quoted keys: ['odyssey_xxx'] = "Name"
        for m in re.finditer(r"\['(odyssey_[^']+)'\]\s*=\s*\"([^\"]*)\"|'([^']+)'\s*=\s*\"([^\"]*\")", block):
            k = m.group(1) or m.group(3)
            v = m.group(2) or m.group(4)
            if k and k.startswith('odyssey_'):
                names[k] = v.strip('"')

    # Descriptions: poker_hand_descriptions = { ["odyssey_xxx"] = { "text" }, ... }
    pd_pos = content.find('poker_hand_descriptions = {')
    if pd_pos != -1:
        brace = content.index('{', pd_pos)
        end = _find_block_end(content, brace)
        block = content[brace:end + 1]
        for m in re.finditer(r'\["(odyssey_[^"]+)"\]\s*=\s*\{\s*"([^"]*)"', block):
            descs[m.group(1)] = [m.group(2)]

    return names, descs


def parse_hand_stats(lua_path: Path) -> dict:
    """
    Parse 12_poker_hands.lua and return stats per key.
    Returns {key: {chips, mult, l_chips, l_mult, visible}}
    """
    content = lua_path.read_text(encoding='utf-8')
    stats: dict[str, dict] = {}

    for m in re.finditer(r"SMODS\.PokerHand\s*\(\s*\{", content):
        block_start = m.end() - 1
        block_end = _find_block_end(content, block_start)
        block = content[block_start:block_end + 1]

        key_m = re.search(r"key\s*=\s*'([^']+)'", block)
        if not key_m:
            continue
        key = key_m.group(1)
        chips_m  = re.search(r'\bchips\s*=\s*(\d+)', block)
        mult_m   = re.search(r'\bmult\s*=\s*(\d+)', block)
        lch_m    = re.search(r'\bl_chips\s*=\s*(\d+)', block)
        lmu_m    = re.search(r'\bl_mult\s*=\s*(\d+)', block)
        vis_m    = re.search(r'\bvisible\s*=\s*(false|true)', block)

        stats[key] = {
            'chips':   int(chips_m.group(1))  if chips_m  else 0,
            'mult':    int(mult_m.group(1))   if mult_m   else 0,
            'l_chips': int(lch_m.group(1))    if lch_m    else 0,
            'l_mult':  int(lmu_m.group(1))    if lmu_m    else 0,
            'visible': vis_m.group(1) != 'false' if vis_m else True,
        }

    # Loop-generated secret hands (i = 1..27)
    for i in range(1, 28):
        k = f'secret_hand_{i}'
        if k not in stats:
            stats[k] = {
                'chips': 78 + i * 7,
                'mult': 7 + int(i * 1.2),
                'l_chips': 41 + (i % 5),
                'l_mult': 3 + (i % 3),
                'visible': False,
            }

    # Loop-generated multi-pairs (triple / quadruple / quintuple)
    multi_pair = {
        'triple_pair':    {'chips': 51,  'mult': 5,  'l_chips': 30, 'l_mult': 3},
        'quadruple_pair': {'chips': 69,  'mult': 7,  'l_chips': 43, 'l_mult': 4},
        'quintuple_pair': {'chips': 87,  'mult': 9,  'l_chips': 50, 'l_mult': 5},
    }
    for k, v in multi_pair.items():
        stats.setdefault(k, {**v, 'visible': True})

    # Loop-generated N-of-a-kind (6-10)
    for i, k in {6: 'six_of_a_kind', 7: 'seven_of_a_kind', 8: 'eight_of_a_kind',
                 9: 'nine_of_a_kind', 10: 'ten_of_a_kind'}.items():
        stats.setdefault(k, {'chips': [123,157,192,234,278][i-6], 'mult': [13,17,21,24,29][i-6],
                              'l_chips': 70 + i*2, 'l_mult': 10, 'visible': True})

    # Loop-generated Flush N-of-a-kind (6-10)
    for i, k in {6: 'flush_six_of_a_kind', 7: 'flush_seven_of_a_kind',
                 8: 'flush_eight_of_a_kind', 9: 'flush_nine_of_a_kind',
                 10: 'flush_ten_of_a_kind'}.items():
        stats.setdefault(k, {'chips': [201,287,376,489,612][i-6], 'mult': [21,31,43,57,73][i-6],
                              'l_chips': 90 + i*3, 'l_mult': 15, 'visible': True})

    return stats


# ─── Build JSON files ─────────────────────────────────────────────────────────

def sprite_exists(filename: str) -> bool:
    return (ASSETS_2X / filename).exists()

def main():
    print(f"MOD_REPO = {MOD_REPO.resolve()}")
    loc_en = MOD_REPO / "src" / "localization" / "en-us.lua"
    loc_pt = MOD_REPO / "src" / "localization" / "pt_BR.lua"

    print("Parsing localization files...")
    data_en = parse_localization_file(loc_en)
    data_pt = parse_localization_file(loc_pt)

    print("Extracting joker metadata...")
    joker_meta = extract_joker_metadata(MOD_REPO / "src" / "jokers")

    print("Extracting voucher metadata...")
    voucher_meta = extract_voucher_metadata(MOD_REPO / "src" / "07_vouchers.lua")

    # ── JOKERS ──────────────────────────────────────────────────────────────
    jokers_en = data_en.get("Joker", {})
    jokers_pt = data_pt.get("Joker", {})

    # Only include jokers that have an actual SMODS.Joker definition in src/jokers/*.lua
    # This excludes orphaned localization entries (renamed, removed, or unimplemented jokers)
    valid_joker_keys = set(joker_meta.keys())

    jokers = []
    for lua_key, en_data in jokers_en.items():
        # lua_key like "j_odyssey_j_singularity_solitary"
        if not lua_key.startswith("j_odyssey_j_"):
            continue
        inner_key = lua_key[len("j_odyssey_"):]  # "j_singularity_solitary"

        # Skip entries that don't have a real joker definition
        if inner_key not in valid_joker_keys:
            continue

        group, item_name = joker_key_to_group_name(inner_key)

        # Normalize group: probability → luck_and_probability
        if group == "probability":
            group = "luck_and_probability"

        sprite = f"odyssey_{inner_key}.png"
        pt_data = jokers_pt.get(lua_key, {})
        meta = joker_meta.get(inner_key, {})

        jokers.append({
            "key": inner_key,
            "group": group,
            "rarity": meta.get("rarity", 1),
            "cost": meta.get("cost", 4),
            "sprite": f"jokers/{sprite}",
            "name_en": en_data["name"],
            "name_pt": pt_data.get("name", en_data["name"]),
            "desc_en": en_data["text"],
            "desc_pt": pt_data.get("text", en_data["text"]),
            "blueprint_compat": meta.get("blueprint_compat", False),
            "eternal_compat": meta.get("eternal_compat", False),
            "vars": meta.get("vars", []),
        })

    jokers.sort(key=lambda x: (x["group"], x["name_en"]))
    print(f"  Jokers: {len(jokers)}")
    (OUTPUT_DIR / "jokers.json").write_text(json.dumps(jokers, ensure_ascii=False, indent=2))

    # ── DECKS ────────────────────────────────────────────────────────────────
    decks_en = data_en.get("Back", {})
    decks_pt = data_pt.get("Back", {})

    decks = []
    seen_keys = set()
    for lua_key, en_data in decks_en.items():
        if not lua_key.startswith("b_odyssey_"):
            continue
        deck_name = lua_key[len("b_odyssey_"):]  # e.g. "alpha", "dragon"
        if deck_name in seen_keys or deck_name in DECK_EXCLUDE:
            continue
        seen_keys.add(deck_name)

        # Sprite resolution priority:
        # 1. Manual override (for localization inconsistencies)
        # 2. Key-based (works for English-keyed bracket entries like 'alpha', 'dragon')
        # 3. Name-based (works for PT-keyed entries with translated English names)
        # 4. Fallback (ceramic, rubber, platinum, diamond have no mod sprite)
        if deck_name in DECK_SPRITE_OVERRIDES:
            sprite = f"odyssey_d_{DECK_SPRITE_OVERRIDES[deck_name]}.png"
        else:
            sprite_by_key = f"odyssey_d_{deck_name}.png"
            sprite_by_name = f"odyssey_d_{deck_name_to_sprite_slug(en_data['name'])}.png"
            if sprite_exists(sprite_by_key):
                sprite = sprite_by_key
            elif sprite_exists(sprite_by_name):
                sprite = sprite_by_name
            else:
                sprite = sprite_by_key  # will show placeholder via onerror

        pt_data = decks_pt.get(lua_key, {})

        # Apply EN corrections for entries with untranslated PT text in en-us.lua
        override = DECK_EN_OVERRIDES.get(deck_name, {})

        decks.append({
            "key": deck_name,
            "sprite": f"decks/{sprite}",
            "name_en": override.get('name', en_data["name"]),
            "name_pt": pt_data.get("name", en_data["name"]),
            "desc_en": override.get('text', en_data["text"]),
            "desc_pt": pt_data.get("text", en_data["text"]),
        })

    decks.sort(key=lambda x: x["name_en"])
    print(f"  Decks: {len(decks)}")
    (OUTPUT_DIR / "decks.json").write_text(json.dumps(decks, ensure_ascii=False, indent=2))

    # ── TAROTS ───────────────────────────────────────────────────────────────
    tarots_en = data_en.get("Tarot", {})
    tarots_pt = data_pt.get("Tarot", {})

    # tarot_max from source (copy from 08_tarots.lua parsing or hardcode)
    # Parse from source
    tarot_lua = (MOD_REPO / "src" / "08_tarots.lua").read_text(encoding="utf-8")
    tarot_max = {}
    max_m = re.search(r'local tarot_max\s*=\s*\{([^}]+)\}', tarot_lua, re.DOTALL)
    if max_m:
        for entry in re.finditer(r'\[(\d+)\]\s*=\s*(\d+)', max_m.group(1)):
            tarot_max[int(entry.group(1))] = int(entry.group(2))

    tarots = []
    for lua_key, en_data in tarots_en.items():
        # e.g. "c_odyssey_tarot_1"
        m = re.match(r'c_odyssey_tarot_(\d+)$', lua_key)
        if not m:
            continue
        n = int(m.group(1))
        sprite = f"odyssey_tarot_{n}.png"
        pt_data = tarots_pt.get(lua_key, {})

        tarots.append({
            "id": n,
            "type": "tarot",
            "sprite": f"tarots/{sprite}",
            "name_en": en_data["name"],
            "name_pt": pt_data.get("name", en_data["name"]),
            "desc_en": en_data["text"],
            "desc_pt": pt_data.get("text", en_data["text"]),
            "max_hand": tarot_max.get(n, 0),
        })

    tarots.sort(key=lambda x: x["id"])
    print(f"  Tarots: {len(tarots)}")
    (OUTPUT_DIR / "tarots.json").write_text(json.dumps(tarots, ensure_ascii=False, indent=2))

    # ── PLANETS ──────────────────────────────────────────────────────────────
    planets_en = data_en.get("Planet", {})
    planets_pt = data_pt.get("Planet", {})

    # Parse planet hand types from 09_planets.lua
    planet_hands: dict[int, str] = {}
    planet_lua_path = MOD_REPO / "src" / "09_planets.lua"
    if planet_lua_path.exists():
        planet_lua_content = planet_lua_path.read_text(encoding="utf-8")
        for pm in re.finditer(r'id\s*=\s*(\d+)[^}]*hand\s*=\s*"([^"]+)"', planet_lua_content):
            pid = int(pm.group(1))
            hand_raw = pm.group(2)
            # Convert "odyssey_royal_flush" → "Royal Flush", "Pair" → "Pair"
            if hand_raw.startswith("odyssey_"):
                hand_display = hand_raw[len("odyssey_"):].replace("_", " ").title()
            else:
                hand_display = hand_raw
            planet_hands[pid] = hand_display

    planets = []
    for lua_key, en_data in planets_en.items():
        m = re.match(r'c_odyssey_planet_(\d+)$', lua_key)
        if not m:
            continue
        n = int(m.group(1))
        sprite = f"odyssey_planet_{n}.png"
        pt_data = planets_pt.get(lua_key, {})

        planets.append({
            "id": n,
            "type": "planet",
            "sprite": f"planets/{sprite}",
            "name_en": en_data["name"],
            "name_pt": pt_data.get("name", en_data["name"]),
            "desc_en": en_data["text"],
            "desc_pt": pt_data.get("text", en_data["text"]),
            "hand": planet_hands.get(n, ""),
        })

    planets.sort(key=lambda x: x["id"])
    print(f"  Planets: {len(planets)}")
    (OUTPUT_DIR / "planets.json").write_text(json.dumps(planets, ensure_ascii=False, indent=2))

    # ── SPECTRALS ────────────────────────────────────────────────────────────
    spectrals_en = data_en.get("Spectral", {})
    spectrals_pt = data_pt.get("Spectral", {})

    spectrals = []
    for lua_key, en_data in spectrals_en.items():
        m = re.match(r'c_odyssey_spectral_(\d+)$', lua_key)
        if not m:
            continue
        n = int(m.group(1))
        sprite = f"odyssey_spectral_{n}.png"
        pt_data = spectrals_pt.get(lua_key, {})

        spectrals.append({
            "id": n,
            "type": "spectral",
            "sprite": f"spectrals/{sprite}",
            "name_en": en_data["name"],
            "name_pt": pt_data.get("name", en_data["name"]),
            "desc_en": en_data["text"],
            "desc_pt": pt_data.get("text", en_data["text"]),
        })

    spectrals.sort(key=lambda x: x["id"])
    print(f"  Spectrals: {len(spectrals)}")
    (OUTPUT_DIR / "spectrals.json").write_text(json.dumps(spectrals, ensure_ascii=False, indent=2))

    # ── VOUCHERS ─────────────────────────────────────────────────────────────
    vouchers_en = data_en.get("Voucher", {})
    vouchers_pt = data_pt.get("Voucher", {})

    vouchers = []
    for lua_key, en_data in vouchers_en.items():
        if not lua_key.startswith("v_odyssey_"):
            continue
        v_name = lua_key[len("v_odyssey_"):]  # e.g. "telescope"
        # Upgraded (_v) vouchers share the same sprite file as their base version
        sprite_name = v_name[:-2] if v_name.endswith('_v') else v_name
        sprite = f"odyssey_v_{sprite_name}.png"
        pt_data = vouchers_pt.get(lua_key, {})
        meta = voucher_meta.get(v_name, {"tier": 1, "pair_key": None, "cost": 10})

        vouchers.append({
            "key": v_name,
            "tier": meta["tier"],
            "pair_key": meta.get("pair_key"),
            "sprite": f"vouchers/{sprite}",
            "name_en": en_data["name"],
            "name_pt": pt_data.get("name", en_data["name"]),
            "desc_en": en_data["text"],
            "desc_pt": pt_data.get("text", en_data["text"]),
            "cost": meta.get("cost", 10),
        })

    vouchers.sort(key=lambda x: (x["tier"], x["name_en"]))
    print(f"  Vouchers: {len(vouchers)}")
    (OUTPUT_DIR / "vouchers.json").write_text(json.dumps(vouchers, ensure_ascii=False, indent=2))

    # ── BLINDS ───────────────────────────────────────────────────────────────
    blinds_en = data_en.get("Blind", {})
    blinds_pt = data_pt.get("Blind", {})

    blinds = []
    for lua_key, en_data in blinds_en.items():
        m = re.match(r'bl_odyssey_blind_(\d+)$', lua_key)
        if not m:
            continue
        n = int(m.group(1))
        sprite = f"odyssey_blind_{n}.png"
        pt_data = blinds_pt.get(lua_key, {})

        blinds.append({
            "id": n,
            "sprite": f"blinds/{sprite}",
            "name_en": en_data["name"],
            "name_pt": pt_data.get("name", en_data["name"]),
            "desc_en": en_data["text"],
            "desc_pt": pt_data.get("text", en_data["text"]),
        })

    blinds.sort(key=lambda x: x["id"])
    print(f"  Blinds: {len(blinds)}")
    (OUTPUT_DIR / "blinds.json").write_text(json.dumps(blinds, ensure_ascii=False, indent=2))

    # ── ENHANCEMENTS ─────────────────────────────────────────────────────────
    enh_en = data_en.get("Enhanced", {})
    enh_pt = data_pt.get("Enhanced", {})

    enhancements = []
    for lua_key, en_data in enh_en.items():
        pt_data = enh_pt.get(lua_key, {})
        # Try to find sprite
        enh_name = lua_key.replace("m_odyssey_", "").replace("e_odyssey_", "")
        sprite_candidates = [
            f"odyssey_e_{enh_name}.png",
            f"odyssey_{lua_key}.png",
        ]
        sprite = sprite_candidates[0]

        enhancements.append({
            "key": lua_key,
            "sprite": f"enhancements/{sprite}",
            "name_en": en_data["name"],
            "name_pt": pt_data.get("name", en_data["name"]),
            "desc_en": en_data["text"],
            "desc_pt": pt_data.get("text", en_data["text"]),
        })

    print(f"  Enhancements: {len(enhancements)}")
    (OUTPUT_DIR / "enhancements.json").write_text(json.dumps(enhancements, ensure_ascii=False, indent=2))

    # ── POKER HANDS ───────────────────────────────────────────────────────────
    hands_lua = MOD_REPO / "src" / "12_poker_hands.lua"
    hand_stats = parse_hand_stats(hands_lua) if hands_lua.exists() else {}

    en_content = (MOD_REPO / "src" / "localization" / "en-us.lua").read_text(encoding="utf-8")
    pt_content = (MOD_REPO / "src" / "localization" / "pt_BR.lua").read_text(encoding="utf-8")
    names_en, descs_en = parse_poker_hands_from_loc(en_content)
    names_pt, descs_pt = parse_poker_hands_from_loc(pt_content)

    hands = []
    for loc_key, name_en in names_en.items():
        game_key = loc_key[len("odyssey_"):]  # strip "odyssey_" prefix
        if game_key == "all_hands":          # dummy placeholder, skip
            continue
        stats = hand_stats.get(game_key, {})
        is_secret = game_key.startswith("secret_hand_")
        fallback_desc = ["?????"] if is_secret else [""]
        hands.append({
            "key":     game_key,
            "name_en": name_en,
            "name_pt": names_pt.get(loc_key, name_en),
            "desc_en": descs_en.get(loc_key, fallback_desc),
            "desc_pt": descs_pt.get(loc_key, descs_en.get(loc_key, fallback_desc)),
            "chips":   stats.get("chips",   0),
            "mult":    stats.get("mult",    0),
            "l_chips": stats.get("l_chips", 0),
            "l_mult":  stats.get("l_mult",  0),
            "secret":  is_secret or not stats.get("visible", True),
        })

    hands.sort(key=lambda x: (x["secret"], x["name_en"]))
    print(f"  Hands: {len(hands)}")
    (OUTPUT_DIR / "hands.json").write_text(json.dumps(hands, ensure_ascii=False, indent=2))

    # Copy CHANGELOG.md from mod repo into data dir so GitHub Actions can build it
    changelog_src = MOD_REPO / "CHANGELOG.md"
    if changelog_src.exists():
        import shutil
        shutil.copy(changelog_src, OUTPUT_DIR / "CHANGELOG.md")
        print("  CHANGELOG.md → copied")

    print("\nDone! Files written to:", OUTPUT_DIR.resolve())
    print("Summary:")
    print(f"  jokers.json    → {len(jokers)} entries")
    print(f"  decks.json     → {len(decks)} entries")
    print(f"  tarots.json    → {len(tarots)} entries")
    print(f"  planets.json   → {len(planets)} entries")
    print(f"  spectrals.json → {len(spectrals)} entries")
    print(f"  vouchers.json  → {len(vouchers)} entries")
    print(f"  blinds.json    → {len(blinds)} entries")
    print(f"  enhancements.json → {len(enhancements)} entries")
    print(f"  hands.json     → {len(hands)} entries")


if __name__ == "__main__":
    main()
