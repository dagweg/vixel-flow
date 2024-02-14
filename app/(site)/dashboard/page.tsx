import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function Dashboard() {
    return (
        <div className="px-8">
            <h1>Dashboard</h1>
            <section className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-3">
                    <Card className="max-w-[500px] h-[375px]">
                        <CardHeader>
                            <CardTitle>Recent Vixels</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card className="max-w-[500px] h-[200px]">
                        <CardHeader>
                            <CardTitle>Mostly used Effects</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card className="max-w-[500px] h-[200px]">
                        <CardHeader>
                            <CardTitle>Time Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Images</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <Card className="max-w-[750px] h-[375px]">
                        <CardHeader>
                            <CardTitle>Recent Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Images</p>
                        </CardContent>
                    </Card>
                    <Card className="max-w-[750px] h-[375px]">
                        <CardHeader>
                            <CardTitle>Recent Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Images</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
