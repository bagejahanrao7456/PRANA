const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const calculateRisk = require("./services/riskEngine")
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

app.listen(PORT, () => {
  console.log(`PRANA server running on http://localhost:${PORT}`)
})