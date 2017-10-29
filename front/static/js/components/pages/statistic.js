import React from "react";
import Chart from 'chart.js'

export default class Statistic extends React.Component {
    componentDidMount() {
        let ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx,{
            type: 'pie',
            data: {
                labels: ['Item 1', 'Item 2', 'Item 3'],
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                }]
            },
            options: {
                responsive: true
            }
        });

        let ctx2 = document.getElementById("myChart2");
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['Item 1', 'Item 2', 'Item 3'],
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                }]
            }
        });

        let ctx3 = document.getElementById("myChart3");
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Item 1', 'Item 2', 'Item 3'],
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                }]
            }
        });

        let ctx4 = document.getElementById("myChart4");
        new Chart(ctx4, {
            type: 'polarArea',
            data: {
                labels: ['Item 1', 'Item 2', 'Item 3'],
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                }]
            }
        });

        let ctx5 = document.getElementById("myChart5");
        new Chart(ctx5, {
            type: 'doughnut',
            data: {
                labels: ['Item 1', 'Item 2', 'Item 3'],
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                }]
            }
        });


    }
    render() {

        return (

            <div className="container">
                Statistic
                <div>
                    <canvas id="myChart"></canvas>
                    <canvas id="myChart2"></canvas>
                    <canvas id="myChart3"></canvas>
                    <canvas id="myChart4"></canvas>
                    <canvas id="myChart5"></canvas>
                </div>
            </div>
        )
    }
}