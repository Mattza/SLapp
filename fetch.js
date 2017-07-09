module.exports = {
  getJSON: url => {
    let pmMode = process.argv.some((arg) => arg === '--pm');
    let host = url.split('/').slice(0, 3).join('/');
    let option = pmMode ? {
      host: "proxyw.ppm.nu",
      port: 8080,
      path: url,
      headers: {
        host
      }
    } : url;
    return new Promise((res, rej) => {
      require('http').get(option, response => {
        let datas = ''
        response.on('data', data => {
          datas += data.toString();
        });
        response.on('end', () => {
          try {
            const json = JSON.parse(datas);
            json ? res(json) : rej(datas);
          } catch (error) {
            rej(error);
          }
        })
      })
    })
  }
}