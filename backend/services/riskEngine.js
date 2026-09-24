function calculateRisk(hazardScore, vulnerabilityScore, disasterHistoryScore) {
    const riskScore =
      hazardScore * 0.4 +
      vulnerabilityScore * 0.3 +
      disasterHistoryScore * 0.3
  
    let riskLevel
  
    if (riskScore <= 30) {
      riskLevel = "LOW"
    } else if (riskScore <= 60) {
      riskLevel = "MEDIUM"
    } else {
      riskLevel = "HIGH"
    }
  
    const redZone = riskScore >= 70
  
    let relocationPriority
  
    if (riskScore >= 80) {
      relocationPriority = "IMMEDIATE"
    } else if (riskScore >= 60) {
      relocationPriority = "SHORT-TERM"
    } else if (riskScore >= 40) {
      relocationPriority = "MEDIUM-TERM"
    } else {
      relocationPriority = "MONITOR"
    }
  
    return {
      riskScore: Number(riskScore.toFixed(2)),
      riskLevel,
      redZone,
      relocationPriority
    }
  }
  
  module.exports = calculateRisk