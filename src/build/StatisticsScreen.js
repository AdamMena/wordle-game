import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function StatisticsScreen({ correctWord, attempts }) {
    const chartRef = useRef(null);

    useEffect(() => {
        // Check if the chartRef is defined before attempting to create the chart
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            try {
                const chart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ["Attempts"],
                        datasets: [
                            {
                                label: "Attempts",
                                data: [attempts],
                                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                                borderColor: ["rgba(75, 192, 192, 1)"],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: "Number of Attempts",
                                },
                            },
                        },
                    },
                });

                // You can further customize the chart here, e.g., add tooltips, etc.

                // It's a good practice to destroy the chart when the component unmounts
                return () => {
                    chart.destroy();
                };
            } catch (error) {
                console.error("Error creating the chart:", error);
            }
        }
    }, [attempts]);

    return (
        <div className="statisticsScreen">
            <h3>Congratulations! You correctly guessed the word</h3>
            <p>Correct Word: {correctWord}</p>
            <p>You guessed in {attempts} attempt(s)</p>
            <p>Refresh the page to play again!</p>
            <canvas ref={chartRef} width={400} height={200}></canvas>
        </div>
    );
}

export default StatisticsScreen;