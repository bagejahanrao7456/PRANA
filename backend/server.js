const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const calculateRisk = require("./services/riskEngine")
const calculateSuitability = require("./services/suitabilityEngines")

const app = express()
const PORT = 5001

app.use(
  cors({
    origin: "http://localhost:5173",
  })
)

app.use(express.json())

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "PRANA backend is running"
  })
})

// Villages API
app.get("/api/villages", (req, res) => {
  const filePath = path.join(__dirname, "../data/villages.json")

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Unable to read villages data"
      })
    }

    const villages = JSON.parse(data)

    const updatedVillages = villages.map((village) => {
      const risk = calculateRisk(
        village.hazardScore,
        village.vulnerabilityScore,
        village.disasterHistoryScore
      )

      return {
        ...village,
        ...risk
      }
    })

    res.json(updatedVillages)
  })
})

// Relocation Sites API
app.get("/api/relocation-sites", (req, res) => {
  const sitesPath = path.join(__dirname, "../data/relocationSites.json")
  const villagesPath = path.join(__dirname, "../data/villages.json")

  fs.readFile(sitesPath, "utf8", (siteErr, siteData) => {
    if (siteErr) {
      return res.status(500).json({
        error: "Unable to read relocation sites data"
      })
    }

    fs.readFile(villagesPath, "utf8", (villageErr, villageData) => {
      if (villageErr) {
        return res.status(500).json({
          error: "Unable to read villages data"
        })
      }

      const sites = JSON.parse(siteData)
      const villages = JSON.parse(villageData)

      const villageId = req.query.villageId

      const village = villages.find(
        (v) => v.id === villageId
      )

      if (!village) {
        return res.json(sites)
      }

      const updatedSites = sites.map((site) => ({
        ...site,
        ...calculateSuitability(site, village)
      }))

      res.json(updatedSites)
    })
  })
})

app.listen(PORT, () => {
  console.log(`PRANA server running on http://localhost:${PORT}`)
})