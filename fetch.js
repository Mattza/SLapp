module.exports = {
  getJSON: url => new Promise((res, rej) => {
    require('http').get(process.argv.some(arg => arg === '--pm') ? {
      host: "proxyw.ppm.nu",
      port: 8080,
      path: url,
      headers: { host: url.split('/').slice(0, 3).join('/') }
    } : url,
      response => {
        let datas = '';
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