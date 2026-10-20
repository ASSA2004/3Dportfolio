"""Structural checks without external packages: python check_project.py."""
from pathlib import Path
from html.parser import HTMLParser
import re
import json
import struct

root = Path(__file__).resolve().parent
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.files = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            value = attrs.get(key, '')
            if value.startswith('./') and value != './':
                self.files.append(value)
page = Page()
page.feed((root / 'index.html').read_text(encoding='utf-8'))
for file in page.files:
    assert (root / file).is_file(), file
js = (root / 'app.js').read_text(encoding='utf-8')
dynamic_ids = set(re.findall(r'id="([^"$]+)"', js))
assert set(re.findall(r"\$\('([^']+)'\)", js)) <= page.ids | dynamic_ids
css = (root / 'style.css').read_text(encoding='utf-8')
assert css.count('{') == css.count('}')
model = (root / 'public/models/studio.glb').read_bytes()
assert model[:4] == b'glTF'
assert struct.unpack_from('<I', model, 8)[0] == len(model)
size = struct.unpack_from('<I', model, 12)[0]
data = json.loads(model[20:20+size])
nodes = {node.get('name') for node in data['nodes']}
for name in ('Laptop','Phone','ResumeFolder','WorkBag','CertificateFrames',
             'EducationFrame','Medal','SolarSystem','Notebook','ContactCard',
             'Nameplate','Desk','DeskLamp'):
    assert name in nodes, name
assert not data.get('extensionsRequired'), 'Check model decoder requirements'
print('PASS: page assets, DOM references, CSS balance, GLB integrity, and all interactive parents.')
