import styles from "@/app/ui/app.module.css";
import { Skeleton } from "@mui/material";
import React from "react";
let isMobile = window.matchMedia("(max-width: 767)").matches;
export function CollectionSkeleton() {
    return  !isMobile?
    (
        <div className={`flex gap-2 pl-20 overflow-x-scroll overflow-y-hidden ${styles.spacingRow} ${styles.showCaseSkeletonContainer}`}>
            <Skeleton variant="rectangular" width={259} height={389} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
            <Skeleton variant="rectangular" width={259} height={389} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
            <Skeleton variant="rectangular" width={259} height={389} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
            <Skeleton variant="rectangular" width={259} height={389} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
            <Skeleton variant="rectangular" width={259} height={389} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
            <Skeleton variant="rectangular" width={259} height={389} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
            <Skeleton variant="rectangular" width={259} height={389} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />


        </div>
    ):(
            <div className={`flex gap-2 pl-20 overflow-x-scroll overflow-y-hidden ${styles.spacingRow} ${styles.showCaseSkeletonContainer}`}>
                <Skeleton variant="rectangular" width={114} height={172} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="rectangular" width={114} height={172} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="rectangular" width={114} height={172} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="rectangular" width={114} height={172} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="rectangular" width={114} height={172} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="rectangular" width={114} height={172} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton variant="rectangular" width={114} height={172} animation={"wave"} sx={{ bgcolor: 'grey.900' }} />


            </div>
        )
}