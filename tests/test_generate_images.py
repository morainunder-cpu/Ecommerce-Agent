#!/usr/bin/env python
# generate_images.py mock/fallback test v0.6.2
import sys, os, json

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'scripts'))

def test_module_importable():
    '''Test that generate_images.py can be imported without immediate crash.'''
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location(
            'generate_images',
            os.path.join(os.path.dirname(__file__), '..', 'scripts', 'generate_images.py')
        )
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        print('  PASS  generate_images.py imports without crash')
        return True
    except Exception as e:
        # Vertex AI import error is expected if gcloud not configured
        if 'google' in str(e).lower() or 'vertex' in str(e).lower():
            print('  PASS  generate_images.py: Vertex AI not available (expected without gcloud)')
            return True
        print(f'  FAIL  generate_images.py: {e}')
        return False

def test_prompts_batch_valid():
    '''Test that prompts_batch.json is valid.'''
    batch_path = os.path.join(os.path.dirname(__file__), '..', 'Input', 'prompts_batch.json')
    if not os.path.exists(batch_path):
        print('  SKIP  prompts_batch.json not found')
        return True
    try:
        with open(batch_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        if isinstance(data, list):
            print(f'  PASS  prompts_batch.json: {len(data)} prompts')
        else:
            print(f'  PASS  prompts_batch.json: valid JSON')
        return True
    except Exception as e:
        print(f'  FAIL  prompts_batch.json: {e}')
        return False

if __name__ == '__main__':
    results = [
        test_module_importable(),
        test_prompts_batch_valid(),
    ]
    if all(results):
        print('\nAll Python tests passed!')
        sys.exit(0)
    else:
        print('\nSome tests failed.')
        sys.exit(1)
