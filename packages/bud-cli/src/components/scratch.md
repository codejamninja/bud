{bud.options.get('server.from.host') && (
          <Box
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignSelf="flex-start">
            <Text color="green">Host:</Text>
            <Spacer />
            <Text>
              {' '}
              {bud.options.get('server.from.host')}:
              {bud.options.get('server.from.port')}
            </Text>
          </Box>
        )}

        {bud.options.get('server.to.host') && (
          <Box
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignSelf="flex-start">
            <Text color="green">Proxied to:</Text>
            <Spacer />
            <Text>
              {' '}
              {bud.options.get('server.to.host')}:
              {bud.options.get('server.to.port')}
            </Text>
          </Box>
        )}

        <Box
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          alignSelf="flex-start">
          <Text color="green">Mode:</Text>
          <Spacer />
          <Text> {bud.mode.get()}</Text>
        </Box>

        <Box
          marginTop={1}
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          alignSelf="flex-start">
          <Text color="green">Features:</Text>
          <Spacer />
          <Text>
            {' '}
            {bud.features
              .entries()
              .filter(([name, enabled]) => enabled)
              .map(([name, enabled]) => `${name} `)}
          </Text>
        </Box>

        <Box
          marginTop={1}
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          alignSelf="flex-start">
          <Text color="green">Features:</Text>
          <Spacer />
          <Text>
            {' '}
            {bud.features
              .entries()
              .filter(([name, enabled]) => enabled)
              .map(([name, enabled]) => `${name} `)}
          </Text>
        </Box>



        {webpackConfig && (
        <Box flexDirection="column">
          <Box
            marginTop={1}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignSelf="flex-start">
            <Text color="green">Entrypoints:</Text>
            <Spacer />
            {Object.entries(webpackConfig.entry).map(
              ([name, files], id) => (
                <Box flexDirection="row" marginTop={1} key={id}>
                  <Text dimColor wrap="truncate">
                    <Text bold>
                      ✨{'  '}
                      {name}
                      {'  '}
                    </Text>
                    {(files as string[]).map(
                      file => `▶ ${file.split('/').pop()} `,
                    )}
                  </Text>
                </Box>
              ),
            )}
          </Box>
          <Box
            marginTop={1}
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignSelf="flex-start">
            <Text color="green">Filetypes supported:</Text>
            <Spacer />
            <Text>
              {' '}
              {webpackConfig.resolve?.extensions?.map(
                ext => `${ext} `,
              )}
            </Text>
          </Box>
        </Box>
      )}