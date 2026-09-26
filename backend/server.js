const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const calculateRisk = require("./services/riskEngine")
const calculateSuitability = require("./services/suitabilityEngines")

const app = express()

const PORT = process.env.PORT || 5001


const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error("Not allowed by CORS"))
    }
  })
)

app.use(express.json())

// Home route / Health check
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
      console.error("Error reading villages data:", err)

      return res.status(500).json({
        error: "Unable to read villages data"
      })
    }

    try {
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
    } catch (error) {
      console.error("Error parsing villages data:", error)

      res.status(500).json({
        error: "Invalid villages data"
      })
    }
  })
})

// Relocation Sites API
app.get("/api/relocation-sites", (req, res) => {

  const sitesPath = path.join(__dirname, "../data/RelocationSites.json")
  const villagesPath = path.join(__dirname, "../data/villages.json")

  fs.readFile(sitesPath, "utf8", (siteErr, siteData) => {
    if (siteErr) {
      console.error("Error reading relocation sites data:", siteErr)

      return res.status(500).json({
        error: "Unable to read relocation sites data"
      })
    }

    fs.readFile(villagesPath, "utf8", (villageErr, villageData) => {
      if (villageErr) {
        console.error("Error reading villages data:", villageErr)

        return res.status(500).json({
          error: "Unable to read villages data"
        })
      }

      try {
        const sites = JSON.parse(siteData)
        const villages = JSON.parse(villageData)

        const villageId = req.query.villageId

        // If no village is selected, return all sites.
        if (!villageId) {
          return res.json(sites)
        }

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
      } catch (error) {
        console.error("Error parsing relocation data:", error)

        res.status(500).json({
          error: "Invalid relocation data"
        })
      }
    })
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`PRANA server running on port ${PORT}`)
})