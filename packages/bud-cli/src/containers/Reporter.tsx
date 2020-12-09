import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'

import {usePackageJson} from '../hooks/usePackageJson'
import {useStyle} from '@roots/ink-use-style'

import {Assets} from '../components/Assets'
import Errors from '../components/Errors'
import Progress from '../components/Progress'
import {Debug} from '../components/Debug'

import type {Bud} from '@roots/bud-typings'
import type {UseStats} from '../hooks/useStats'
import type {UseProgress} from '../hooks/useProgress'
import {useDisk} from '../hooks/useDisk'
import {Git} from '../components/Git'

declare namespace Reporter {
  export type Props = {
    bud: Bud
    stats: UseStats.Stats
    progress: UseProgress.Progress
    errors?: string[]
  }

  export type Component = React.FunctionComponent<Props>
}

const Reporter: Reporter.Component = ({
  bud,
  stats,
  progress,
  errors,
}) => {
  const [disk] = useDisk(bud)
  const pkg = usePackageJson(disk)
  const {bounds, colors} = useStyle()

  return (
    <Box
      display="flex"
      flexDirection="column"
      height={bounds.height}
      alignItems="center"
      justifyContent="space-between">
      <Box flexDirection="column" justifyContent="space-between">
        <Box flexDirection="row" marginTop={1} marginBottom={1}>
          <Box flexDirection="row">
            <Text
              backgroundColor={colors.primary}
              color={colors.white}>
              {' '}
              {progress.msg ? (
                <Spinner />
              ) : stats?.hash ? (
                '✓'
              ) : (
                ''
              )}{' '}
              {pkg?.name}{' '}
            </Text>

            <Text dimColor color={colors.white} italic>
              {' '}
              {progress.msg ? (
                <Text italic dimColor>
                  {progress.msg}
                </Text>
              ) : stats?.hash ? (
                <Text italic dimColor>
                  {stats.hash}
                </Text>
              ) : (
                <></>
              )}
            </Text>
          </Box>
        </Box>

        <Box flexDirection="column">
          {(!errors || !errors[0]) && (
            <Box flexDirection="column" marginBottom={1}>
              <Assets assets={stats?.assets} />
            </Box>
          )}

          {errors && errors[0] && <Errors errors={errors} />}

          {stats?.warnings && stats?.warnings[0] && (
            <Errors errors={stats.warnings} />
          )}

          {stats?.time && (
            <>
              <Text>
                Compiled in{' '}
                <Text bold color={colors.success}>
                  {stats.time / 1000}s
                </Text>
              </Text>
            </>
          )}

          {bud.args.has('debug') && <Debug bud={bud} />}
        </Box>
      </Box>

      <Box flexDirection="column">
        <Progress {...progress} />
        <Box
          marginTop={1}
          flexDirection="row"
          justifyContent="space-between">
          {bud.mode.is('development') && (
            <Text bold color={colors.accent}>
              {'🌐  '}
              {bud.server.config.get('ssl')
                ? 'https://'
                : 'http://'}
              {bud.server.config.get('host')}:
              {bud.server.config.get('port')}
            </Text>
          )}

          <Git />
        </Box>
      </Box>
    </Box>
  )
}

export {Reporter}
