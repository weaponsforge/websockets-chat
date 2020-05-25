const fs = require('fs')
const path = require('path')

// Write the server .env file content in javascript for web client usage

try {
  const filePath = path.join(__dirname, '..', '/public/js/defines.js')
  const label = '// Generated do not edit - global constant definitions for web client in sync with server/defines.js\n\n'
  let hasDefines = true

  // Check if the client defines file already exists.
  try {
    fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    hasDefines = false
    console.log('Defines file not found.')
  }

  if (hasDefines) {
    console.log('Client defines file already exists, skipping.')
    process.exit()
  }

  // Write the label to file
  fs.writeFile(filePath, label, function (err) {
    if (err) throw new Error(err)
    console.log('Client defines file created.')
  })

  // Read the .env file
  const env = fs.readFileSync(path.join(__dirname, '..', '/.env'), 'utf8').replace(/ /g, '')

  // Format and write the .env content to file
  const keys = env.split('\r\n').filter(keypair => keypair !== '')
    .map(item => {
      const pair = item.split('=')

      if (pair[0] === 'SERVER_PORT') {
        return `const ${pair[0]} = ${process.env.PORT || pair[1]}`
      } else {
        if (!isNaN(pair[1])) {
          return `const ${pair[0]} = ${parseInt(pair[1])}`
        } else {
          return `const ${pair[0]} = '${pair[1]}'`
        }
      }
    }).toString().replace(/,/g, '\n')

  fs.appendFile(filePath, `${keys}\n`, function (err) {
    if (err) throw new Error(err)
    console.log('Defines file updated.')
    process.exit()
  })
} catch (e) {
  throw new Error('Error parsing .env file.')
}
