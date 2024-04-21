import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


function Chart({ users }) {

    const userCountByDate = users.reduce((acc, user) => {
        const date = user.creationdate.split('T')[0]; // Simplify the date to just 'YYYY-MM-DD'
        if (acc[date]) {
            acc[date]++;
        } else {
            acc[date] = 1;
        }
        return acc;
    }, {});

    const dates = Object.keys(userCountByDate);
    const values = Object.values(userCountByDate).map(value => ({ y: value }));

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Users Count by Creation Date'
        },
        xAxis: {
            categories: dates,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Users'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} users</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Users',
            data: values
        }]
    };


    return (
        <div style={{ width: '500px' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}

            />
      </div>
      
  );
}

export default Chart;