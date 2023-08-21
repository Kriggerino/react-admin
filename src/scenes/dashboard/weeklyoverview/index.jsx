// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// // ** Icons Imports
// import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import Chart from 'react-apexcharts'


const WeeklyOverview = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    
  }

  return (
    <Card sx={{width:"100%", height: "100%"}}>
      {/* <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      /> */}
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 }, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <Chart type='donut' height={205} options={options} series={[{ data: [37, 57, 45, 75, 57, 40, 65] }]} />
        <Button fullWidth variant='contained'>
          Details
        </Button>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview