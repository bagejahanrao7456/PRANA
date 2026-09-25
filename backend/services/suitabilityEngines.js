function calculateSuitability(site, village) {
    const capacityOkay = site.capacity >= village.population
  
    const facilities =
      Number(site.facilities.water) +
      Number(site.facilities.hospital) +
      Number(site.facilities.school) +
      Number(site.facilities.road) +
      Number(site.facilities.electricity)
  
    let suitability
  
    if (capacityOkay && facilities === 5) {
      suitability = "HIGH"
    } else if (capacityOkay && facilities >= 3) {
      suitability = "MEDIUM"
    } else {
      suitability = "LOW"
    }
  
    return {
      capacityOkay,
      facilitiesAvailable: facilities,
      suitability
    }
  }
  
  module.exports = calculateSuitability