"use client";
import styles from "@/app/ui/app.module.css";
import { Skeleton } from "@mui/material";
import React from "react";
let isMobile = false;


export function ShowCaseSkeleton() {
    return <div className={`flex gap-2 pl-20 overflow-x-scroll overflow-y-hidden ${styles.spacingRow} ${styles.showCaseSkeletonContainer}`}>
            <Skeleton variant="rectangular" animation={"wave"} className={styles.showcaseSkeleton} />
            <Skeleton variant="rectangular" animation={"wave"} className={styles.showcaseSkeleton} />
            <Skeleton variant="rectangular" animation={"wave"} className={styles.showcaseSkeleton} />
            <Skeleton variant="rectangular" animation={"wave"} className={styles.showcaseSkeleton} />
        </div>

}
