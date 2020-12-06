import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'

import {usePackageJson} from '../hooks/usePackageJson'
import {useStyle} from '@roots/ink-use-style'
import {useGit} from '../hooks/useGit'

import Assets from '../components/Assets'
import Errors from '../components/Errors'
import Progress from '../components/Progress'
import {Debug} from '../components/Debug'

import type {Bud} from '@roots/bud-typings'
import type {UseStats} from '../hooks/useStats'
import type {UseProgress} from '../hooks/useProgress'

declare namespace Reporter {
  export type Props = {
    bud: Bud.Bud
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
  const git = useGit()
  const pkg = usePackageJson(bud)
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

          {git && (
            <Box
              flexDirection="row"
              justifyContent="space-between">
              {git.branch && (
                <Text backgroundColor={colors.primary}>
                  {' '}
                  {git.branch && (
                    <Text color={colors.white}>{git.branch}</Text>
                  )}{' '}
                  {git.head && (
                    <Text color={colors.white}>{git.head}</Text>
                  )}{' '}
                </Text>
              )}
              {(git.dirty || git.status) && (
                <Text>
                  <Text> </Text>
                  <Text
                    color={colors.white}
                    backgroundColor={colors.error}>
                    {' '}
                    {git.status && <Text>$!</Text>}
                    {git.dirty && <Text>+</Text>}{' '}
                  </Text>
                </Text>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export {Reporter}
