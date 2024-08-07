const fs = require('fs');

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.servicePartnersLogo = (req, res) => {
  try{
    let partnerId = req.params['partnerId'];
    if(!partnerId || partnerId === null){
      res.status(400).send();
    } else {
      let logo = this.partnerLogoToBase64(partnerId);

      res.status(200).send({logo: logo != null 
                                    ? `data:image/png;base64,${this.partnerLogoToBase64(partnerId)}`
                                    : null});
    }
  }catch(ex){
    errorHandler(ex, res);
  }
}

exports.partnerLogoToBase64 = (partnerId) => {
  try{
    const path = require('path').resolve(__dirname, `../../assets/kepecas/img/servicePartners/${partnerId}.png`);

    return Buffer.from(fs.readFileSync(path)).toString('base64');
  }catch(ex){
    console.log(ex);

    return null;
  }
}