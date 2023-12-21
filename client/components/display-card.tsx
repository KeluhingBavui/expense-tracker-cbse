'use client';

import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export interface DisplayCardProps {
    title: string;
    content: string;
}

const DisplayCard: React.FC<DisplayCardProps> = ({ title, content }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
        </Card>

    );
};

export default DisplayCard;
