"use client";
import styles from "@/app/ui/app.module.css";
import { Skeleton } from "@mui/material";
import React from "react";
let isMobile = false;
if(typeof window !== 'undefined')
{
    isMobile = window.matchMedia("(max-width: 767)").matches;
}
export function CollectionSkeleton() {
    return  <div className={`flex gap-2 pl-20 overflow-x-scroll overflow-y-hidden ${styles.spacingRow} ${styles.showCaseSkeletonContainer}`}>
        <Skeleton variant="rectangular" animation={"wave"}  className={styles.collectionSkeleton}/>
        <Skeleton variant="rectangular" animation={"wave"}  className={styles.collectionSkeleton}/>
        <Skeleton variant="rectangular" animation={"wave"}  className={styles.collectionSkeleton}/>
        <Skeleton variant="rectangular" animation={"wave"}  className={styles.collectionSkeleton}/>



    </div>
}
