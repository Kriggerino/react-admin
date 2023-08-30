import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import React from "react";

const PlaceholderCard = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="h5">
              Budget
            </Typography>
            <Typography variant="h3">Test Value</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <AttachMoneyIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PlaceholderCard;
