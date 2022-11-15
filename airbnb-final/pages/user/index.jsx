import { Box } from "@mui/material";
import AppHeader from "../../components/AppHeader";
import SearchHero from "../../components/SearchHero";
import BasicTabs from "../../components/Tabs";

export default function UserDashboard(){
    return (
        <>
            <SearchHero />
            <AppHeader />
            <BasicTabs />
        </>
    )
}