import test from 'ava'
import {bud} from '@roots/bud'

bud.projectPath(__dirname)

test('has expected default', t => {
  t.deepEqual(bud.options.get('postcss'), {
    plugins: [require('postcss-import'), require('autoprefixer')],
  })
})

test('sets option', t => {
  bud.postcss({plugins: ['very-foo-bar']})

  t.true(bud.options.get('postcss.plugins').length === 3)
  t.deepEqual(bud.options.get('postcss.plugins'), [require('postcss-import'), require('autoprefixer'), 'very-foo-bar'])
})