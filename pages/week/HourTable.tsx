import React, { Children } from "react";
import styled from "@emotion/styled";
import { Box, BoxProps, Grid, GridProps, Typography, TypographyProps } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

class HourInDay {
    hour: number;
    slots: number[];

    constructor(hour: number, slots: number) {
        this.hour = hour;
        this.slots = Array(slots);
    }
}

const titleColor = deepPurple[200];

const HourTitle = styled(Grid)<GridProps>(({ theme }) => ({
    background: titleColor,
    borderBottom: "1px solid gray",
}));

const SlotBox = styled(Box)<BoxProps>(({ theme }) => ({
    height: "1.555em",
}));

const SlotText = styled(Typography)<TypographyProps>(({ theme }) => ({
    display: "inline",
    marginLeft: "1em",
    textDecoration: "underline",
    textDecorationColor: "lightgray",
    "&:hover": {
        cursor: "pointer",
        textDecorationColor: "gray"
    }
}));

export const getHours = (start: number, end: number, slots: number = 0) => {
    let hourData: HourInDay[] = [];
    for (let i = start; i <= end; i++) hourData.push(new HourInDay(i, slots));
    return hourData;
};

export const renderHourTitles = (hourData: HourInDay[]) => {
    return (
        <>
            {hourData.map((hour, key) => {
                return (
                    <HourTitle item key={key}>
                        <Typography align="center" sx={{ fontWeight: 700 }}>
                            {hour.hour}
                        </Typography>
                    </HourTitle>
                );
            })}
        </>
    );
};

const setSlots = (props: HourTableProps, hours: HourInDay[]) => {
    const slotSize = 60 / props.slotsPerHour;
    hours.map((hour) => {
        for (let i = 0; i < hour.slots.length; i++) 
            hour.slots[i] = i * slotSize;
    })
}

const renderSlots = (data: HourInDay) => {
    let slots: JSX.Element[] = [];
    const formatter = Intl.NumberFormat("en", { minimumIntegerDigits: 2 })
    data.slots.map((each) => {
        slots.push(
            <SlotText>:{formatter.format(each)}</SlotText>
        )
    });
    return (
        <SlotBox> {Children.toArray(slots)} </SlotBox>
    );
}

const renderHourNslot = (hourData: HourInDay[]) => {
    let hourNslots: JSX.Element[] = [];
    hourData.map((data: HourInDay) => {
        hourNslots.push(
            renderSlots(data)
        );
    });
    return (
        <> { Children.toArray(hourNslots) } </>
    );
}

interface HourTableProps {
    start: number;
    end: number;
    slotsPerHour: number;
    date: Date;
}

const HourTable = (props: HourTableProps) => {
    const hourData = getHours(props.start, props.end, props.slotsPerHour);
    setSlots(props, hourData);
    return (
        <>
            {
                renderHourNslot(hourData)
            }
        </>
    );
};

export default HourTable;
