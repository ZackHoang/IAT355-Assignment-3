const SOURCE = "videogames_wide.csv"
const SCHEMA = 'https://vega.github.io/schema/vega-lite/v6.json'

let averageGlobalSalesPerYearSpec = {
    $schema: SCHEMA,
    description: 'A simple bar chart with embedded data.',
    data: {
        url: SOURCE
    },
    mark: 'bar',
    encoding: {
      x: {field: 'Year', type: 'ordinal'},
      y: {field: 'Global_Sales', type: 'quantitative', aggregate: "mean"},
      tooltip: [
        { field: 'Year' },
        { field: 'Global_Sales' }
      ]
    },
    title: "Average Global Sales Per Year",
};

let mostFrequentGenresSpec = {
    $schema: SCHEMA,
    data: {
        url: SOURCE
    },
    mark: 'bar',
    encoding: {
        x: {field: 'Genre', type: 'quantitative', aggregate: "count"},
        y: {field: 'Genre', type: 'nominal', sort: '-x'},
        tooltip: [
          { field: 'Genre', type: 'quantitative', aggregate: 'count' },
        ]
    }, 
    title: "Number of Categories"
}

let mostPopularPlatformSpec = {
    $schema: SCHEMA,
    data: {
        url: SOURCE
    },
    mark: 'bar',
    encoding: {
        x: {field: 'Platform', type: 'quantitative', aggregate: 'count'},
        y: {field: 'Platform', type: 'nominal', sort: '-x'},
        tooltip: [
          { field: 'Platform', type: 'quantitative', aggregate: 'count' }
        ]
    },
    title: "Number of Platforms"
}

let globalSalesByGenreAndPlatformSpec = {
  $schema: SCHEMA, 
  data: {
    url: SOURCE
  },
  mark: 'bar',
  encoding: {
    x: {field: 'Genre', type: 'nominal', axis: {labelAngle: -45}, sort: '-y'}, 
    y: {field: 'Global_Sales', type: 'quantitative', aggregate: 'sum'},
    color: {field: 'Platform', type: 'nominal'},
    tooltip: [
      { field: 'Platform', type: 'quantitative', aggregate: 'count' }
    ]
  }, 
  title: "Global Sales by Platform and Genre"
}

let salesOverTimeByGenreAndPlatformSpec = {
  $schema: SCHEMA, 
  data: {
    url: SOURCE
  },
  facet: {row: {field: "Genre"}},
  spec: {
    mark: 'bar',
    encoding: {
        x: {field: 'Year', type: 'nominal', timeUnit: "year"},
        y: {field: 'Global_Sales', type: 'quantitative', aggregate: "sum"},
        color: {field: "Platform", type: "nominal"},
        tooltip: [
          { field: 'Platform', type: 'quantitative', aggregate: 'count' }
        ]
    }
  }
}

let regionalSalesVersusPlatformSpec = {
  $schema: SCHEMA,
  description: "Platform sales by region (stacked bar chart)",
  data: { url: SOURCE },
  transform: [
    {
      fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
      as: ["Region", "Sales"]
    }
  ],
  mark: 'bar',
  encoding: {
    x: { field: "Platform", type: "nominal", axis: { labelAngle: -45 }, sort: 'y' },
    y: { field: "Sales", type: "quantitative", aggregate: "sum" },
    color: { field: "Region", type: "nominal" },
    tooltip: [
      { field: "Platform" },
      { field: "Region" },
      { field: "Sales", aggregate: "sum", format: ".2f" }
    ]
  },
  title: "Platform Sales by Region"
}

let yearVersusGenreSpec = {
    $schema: SCHEMA,
    description: 'Genres by Year', 
    data: { url: SOURCE },
    mark: 'bar',
    encoding: {
        x: { field: 'Year', type: 'ordinal' },
        y: { field: 'Genre', type: 'nominal', aggregate: 'count' },
        color: { field: 'Genre', type: 'nominal' }
    },
    title: 'Number of Games by Genre by Year'
}

vegaEmbed('#average-global-sales-per-year', averageGlobalSalesPerYearSpec);
vegaEmbed('#most-frequent-genre', mostFrequentGenresSpec);
vegaEmbed('#most-popular-platform', mostPopularPlatformSpec);
vegaEmbed('#global-sales-by-genre-and-platform', globalSalesByGenreAndPlatformSpec);
vegaEmbed('#sales-over-time-by-genre-and-platform', salesOverTimeByGenreAndPlatformSpec);
vegaEmbed('#regional-sales-versus-platform', regionalSalesVersusPlatformSpec);
vegaEmbed('#year-versus-genre', yearVersusGenreSpec);