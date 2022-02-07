const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')

beforeEach(() => {
  fs.emptyDirSync('tests/__data__/output')
  fs.copyFileSync('tests/__data__/input/database/streams.db', 'tests/__data__/output/streams.db')

  const stdout = execSync(
    'DB_DIR=tests/__data__/output LOGS_DIR=tests/__data__/output/logs/load-cluster node scripts/commands/load-cluster.js --cluster-id=1 --timeout=1',
    { encoding: 'utf8' }
  )
})

it('return results', () => {
  expect(content('tests/__data__/output/logs/load-cluster/cluster_1.log')).toEqual(
    content('tests/__data__/expected/logs/load-cluster/cluster_1.log')
  )
})

function content(filepath) {
  const data = fs.readFileSync(path.resolve(filepath), {
    encoding: 'utf8'
  })

  return data
    .split('\n')
    .filter(l => l)
    .map(l => {
      return JSON.parse(l)
    })
}
