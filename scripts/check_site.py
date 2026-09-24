#!/usr/bin/env python3
from pathlib import Path
import re, sys

root = Path(__file__).resolve().parent.parent
required = [
    'index.html','styles.css','app.js','content.js','config.js','SOURCES.md','README.md','_redirects','.openai/hosting.json',
    'data/mockProperties.js','data/properties.js','data/sanityConfig.js','data/sanityClient.js','data/sanityProperties.js','data/sanityImage.js',
    'data/collectionHelpers.js','data/privateJets.js','data/yachts.js','data/experiences.js','data/privateIslands.js',
    'components/propertyCard.js','components/propertyModal.js','components/propertyFilters.js',
    'components/collectionCard.js','components/collectionModal.js',
    'studio/schemaTypes/privateJet.ts','studio/schemaTypes/yacht.ts','studio/schemaTypes/experience.ts','studio/schemaTypes/privateIsland.ts','studio/structure.ts'
]
missing = [f for f in required if not (root/f).exists()]
if missing:
    print('Missing:', ', '.join(missing)); sys.exit(1)

content = (root/'content.js').read_text()
app = (root/'app.js').read_text()
mock = (root/'data/mockProperties.js').read_text()
names = ['Maldives','Seychelles','Mauritius','Greece','Italy','France','Switzerland','Turkey','Dubai','Thailand','Bali','Waldorf Astoria Maldives Ithaafushi','Cheval Blanc Randheli','JOALI Maldives','One&Only Reethi Rah']
assert 'd("europe"' not in content and 'd("beyond"' not in content, 'Europe and Beyond destination entries should be removed'
assert "['dubai','maldives','seychelles','europe','beyond']" not in app, 'Hero should not link Europe/Beyond'
absent = [n for n in names if n not in content]
assert not absent, f'Missing content entries: {absent}'
assert 'whatsappHref' in app and 'https://wa.me/' in app
assert 'searchOpen' not in app and 'siteSearch' not in app
assert 'villa-discovery' in app and 'openPropertyModal' in app and 'getPropertyBySlug' in app
assert 'renderServiceCollectionSection' in app and 'openCollectionModal' in app
assert 'private-islands' in app and 'Private Islands' in content
assert "['/services/private-islands'" in app or '"/services/private-islands"' in app
assert 'privateIsland' in (root/'studio/schemaTypes/privateIsland.ts').read_text()
assert 'privateJet' in (root/'studio/schemaTypes/privateJet.ts').read_text()
assert 'yacht' in (root/'studio/schemaTypes/yacht.ts').read_text()
assert 'experience' in (root/'studio/schemaTypes/experience.ts').read_text()
assert 'Private Islands' in (root/'studio/structure.ts').read_text()
assert 'Private Jets' in (root/'studio/structure.ts').read_text()
assert 'jana-collection-grid' in (root/'styles.css').read_text()
assert 'repeat(3,minmax(0,1fr))' in (root/'styles.css').read_text()
assert 'data-collection-filters="island"' in (root/'styles.css').read_text()
assert 'propertyModal' in app and 'renderPropertyModalShell' in app
assert 'chalet-example' in mock and 'villa-mykonos' in mock
assert not (root/'components/propertyDetail.js').exists(), 'propertyDetail.js should be removed (modal replaces detail pages)'
assert (root/'studio/scripts/seedPrivateIslands.ts').exists()
assert 'seed:private-islands' in (root/'studio/package.json').read_text()
config = (root/'config.js').read_text()
match = re.search(r'whatsappNumber:\s*"([^"]*)"', config)
assert match, 'WhatsApp configuration is missing'
whatsapp = match.group(1)
assert not whatsapp or re.fullmatch(r'\+[1-9]\d{7,14}', whatsapp), 'WhatsApp number must be blank or use international format'
print('PASS: collections, Studio types, villa modal and contact configuration verified.')
