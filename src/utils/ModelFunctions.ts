function getUrlBase() {
    if (window.location.hostname == "localhost") {
        return "http://localhost:6969"
    } else {
        return "https://forecasting-unemployment-351485952743.asia-east1.run.app"
    }
}

function formatDate(date: string): string {
    const parts = date.split("/")
    const m = parts[0]
    let y = parts[1]
    if (Number(y) > 50) {
        y = "19" + y
    } else {
        y = "20" + y
    }

    return `${y}-${m}-01`
}

export type ForecastResult = {
    base: {
        data: number[],
        index: string[],
    },
    forecast: {
        data: number[],
        index: string[],
    }
}

export type EvaluationResult = {
    index: string[],
    expected: number[],
    predictions: number[],
}

export async function getInterestAndInflation(date: string) {
    const formattedDate = formatDate(date);
    const url = `${getUrlBase()}/api/get_interest_and_inflation?date=${formattedDate}`;
    const response = await fetch(url, {method: "GET"});

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
        inflation: data["inflation"],
        interest: data["interest"]
    }
}


export async function forecast(start: string, end: string, months: number, interest: number, inflation: number) {
    //convert the dates
    const s = formatDate(start);
    const e = formatDate(end);
    const url = `${getUrlBase()}/api/forecast_unemployment?start=${s}&end=${e}&forecast_months=${months}&interest_rate=${interest}&inflation_rate=${inflation}`;

    const response = await fetch(url, {method: "GET"});

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ForecastResult = await response.json();
    
    return data
}

export async function evaluate(start: string, end: string) {
    //convert the dates
    const s = formatDate(start);
    const e = formatDate(end);
    const url = `${getUrlBase()}/api/evaluate_model?start=${s}&end=${e}`;

    const response = await fetch(url, {method: "GET"});

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: EvaluationResult = await response.json();

    return data
}