const wdigetConfig1 = {
  symbol: 'BINANCE:BTCUSDT',
  width: '100%',
  isTransparent: true,
  colorTheme: 'dark',
  locale: 'pt-br',
};

const widgetConfig2 = {
  symbols: [['BINANCE:BTCUSDT|1D']],
  chartOnly: false,
  width: '100%',
  height: '100%',
  locale: 'pt-br',
  colorTheme: 'dark',
  autosize: true,
  showVolume: false,
  showMA: false,
  hideDateRanges: false,
  hideMarketStatus: false,
  hideSymbolLogo: true,
  scalePosition: 'right',
  scaleMode: 'Normal',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
  fontSize: '10',
  noTimeScale: false,
  valuesTracking: '1',
  changeMode: 'price-and-percent',
  chartType: 'area',
  maLineColor: '#2962FF',
  maLineWidth: 1,
  maLength: 9,
  headerFontSize: 'medium',
  backgroundColor: 'rgba(14, 18, 24, 1)',
  gridLineColor: 'rgba(76, 175, 80, 0.06)',
  lineWidth: 2,
  lineType: 0,
  dateRanges: ['1d|15', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
  dateFormat: 'dd-MM-yyyy',
};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('coin');

  if (query) {
    fetchCoinInfo(query);
  } else {
    window.location.href = '/../../index.html';
  }
});

async function fetchCoinInfo(query) {
  const coinInfoError = document.getElementById('coin-info-error');
  coinInfoError.style.display = 'none';
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${query}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('API limit reached.');
    const data = await response.json();
    wdigetConfig1.symbol = `MEXC:${data.symbol.toUpperCase()}USDT`;

    widgetConfig2.symbols = [[`MEXC:${data.symbol.toUpperCase()}USDT|1D`]];

    initializeWidget();
    displayCoinInfo(data);
  } catch (error) {
    coinInfoError.style.display = 'flex';
    console.log(error);
  }
}

function initializeWidget() {
  const themeConfig = getThemeConfig();
  wdigetConfig1.colorTheme = themeConfig.theme;
  widgetConfig2.colorTheme = themeConfig.theme;
  widgetConfig2.backgroundColor = themeConfig.backgroundColor;
  widgetConfig2.gridLineColor = themeConfig.gridColor;

  createWidget(
    'ticker-widget',
    wdigetConfig1,
    'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js',
  );
  createWidget(
    'mini-chart-widget',
    widgetConfig2,
    'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js',
  );
}

function displayCoinInfo(coin) {
  const coinInfo = document.querySelector('.coin-info');
  const rightSec = document.querySelector('.coin-container .right-section');
  const coinDesc = document.getElementById('coin-desc-p');

  coinInfo.innerHTML = `
        <div class="logo">
                    <img src="${coin.image.thumb}" alt="${coin.name}">
                    <h4>${
                      coin.name
                    } <span>(${coin.symbol.toUpperCase()})</span></h4>
                    <p>#${coin.market_cap_rank}</p>
                </div>
                <div class="status">
                    
                    <div class="item">
                        <p class="str">Capitalização de mercado</p>
                        <p class="num">$${
                          coin.market_data.market_cap.usd != null
                            ? coin.market_data.market_cap.usd.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                },
                              )
                            : 'N/A'
                        }</p>
                    </div>
                    <div class="item">
                        <p class="str">Preço atual</p>
                        <p class="num">$${
                          coin.market_data.current_price.usd != null
                            ? coin.market_data.current_price.usd.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                },
                              )
                            : 'N/A'
                        }</p>
                    </div>
                    <div class="item">
                        <p class="str">Alta de todos os tempos</p>
                        <p class="num">$${
                          coin.market_data.ath.usd != null
                            ? coin.market_data.ath.usd.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                },
                              )
                            : 'N/A'
                        }</p>
                    </div>
                    <div class="item">
                        <p class="str">Mínimo histórico</p>
                        <p class="num">$${
                          coin.market_data.atl.usd != null
                            ? coin.market_data.atl.usd.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                },
                              )
                            : 'N/A'
                        }</p>
                    </div>
                    <div class="item">
                        <p class="str">Volume Total</p>
                        <p class="num">$${
                          coin.market_data.total_volume.usd != null
                            ? coin.market_data.total_volume.usd.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                },
                              )
                            : 'N/A'
                        }</p>
                    </div>
                    <div class="item">
                        <p class="str">Oferta Total</p>
                        <p class="num">${
                          coin.market_data.total_supply != null
                            ? coin.market_data.total_supply.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                },
                              )
                            : 'N/A'
                        }</p>
                    </div>
                    <div class="item">
                        <p class="str">Fornecimento Máximo</p>
                        <p class="num">${
                          coin.market_data.max_supply != null
                            ? coin.market_data.max_supply.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                },
                              )
                            : 'N/A'
                        }</p>
                    </div>
                    <div class="item">
                        <p class="str">Fornecimento Circulante</p>
                        <p class="num">${
                          coin.market_data.circulating_supply != null
                            ? coin.market_data.circulating_supply.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                },
                              )
                            : 'N/A'
                        }</p>
                    </div>
                </div>
    `;

  rightSec.innerHTML = `
        <div class="status">
                <h3>Histórico</h3>
                <div class="container">
                <div class="item">
                    <p class="str">ATH</p>
                    <p class="num">$${
                      coin.market_data.ath.usd != null
                        ? coin.market_data.ath.usd.toLocaleString(undefined, {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          })
                        : 'N/A'
                    }</p>
                </div>
                <div class="item">
                    <p class="str">ATL</p>
                    <p class="num">$${
                      coin.market_data.atl.usd != null
                        ? coin.market_data.atl.usd.toLocaleString(undefined, {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          })
                        : 'N/A'
                    }</p>
                </div>
                <div class="item">
                    <p class="str">24h High</p>
                    <p class="num">$${
                      coin.market_data.high_24h.usd != null
                        ? coin.market_data.high_24h.usd.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 3,
                              maximumFractionDigits: 3,
                            },
                          )
                        : 'N/A'
                    }</p>
                </div>
                <div class="item">
                    <p class="str">24h Low</p>
                    <p class="num">$${
                      coin.market_data.low_24h.usd != null
                        ? coin.market_data.high_24h.usd.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 3,
                              maximumFractionDigits: 3,
                            },
                          )
                        : 'N/A'
                    }</p>
                </div>
                </div>
            </div>

            
            <div class="status">
            <h3>Mercados</h3>
            <div class="container">
                <div class="item">
                    <p class="str">${coin.tickers[0].market.name.replace(
                      'Exchange',
                      '',
                    )}</p>
                    <div class="links">
                        <a href="${coin.tickers[0].trade_url}">Troca</a>
                        <p style="background-color: ${
                          coin.tickers[0].trust_score
                        }">Confiável?</p>
                    </div>
                </div>
                <div class="item">
                    <p class="str">${coin.tickers[1].market.name.replace(
                      'Exchange',
                      '',
                    )}</p>
                    <div class="links">
                        <a href="${coin.tickers[1].trade_url}">Troca</a>
                        <p style="background-color: ${
                          coin.tickers[1].trust_score
                        }">Confiável?</p>
                    </div>
                </div>
                <div class="item">
                    <p class="str">${coin.tickers[2].market.name.replace(
                      'Exchange',
                      '',
                    )}</p>
                    <div class="links">
                        <a href="${coin.tickers[2].trade_url}">Troca</a>
                        <p style="background-color: ${
                          coin.tickers[2].trust_score
                        }">Confiável?</p>
                    </div>
                </div>
                </div>
            </div>

            <div class="status">
            <h3>Info</h3>
                <div class="container">
                    <div class="item">
                        <p class="str">Website</p>
                        <div class="links">
                            <a target="_blank" href="${
                              coin.links.homepage
                            }">Visit</a>
                            <a target="_blank" href="${
                              coin.links.whitepaper
                            }">Whitepaper</a>
                        </div>
                    </div>
                    <div class="item">
                        <p class="str">Comunidade</p>
                        <div class="links">
                            <a target="_blank" href="https://x.com/${
                              coin.links.twitter_screen_name
                            }">Twitter</a>
                            <a target="_blank" href="https://facebook.com/${
                              coin.links.facebook_username
                            }">Facebook</a>
                        </div>
                    </div>
                </div>
            </div>
    `;

  coinDesc.innerHTML =
    coin.description.en ||
    '<p class="red">Asset description not available!</p>';
}

function getThemeConfig() {
  const root = getComputedStyle(document.documentElement);
  const isDarkTheme =
    localStorage.getItem('theme') === 'light-theme' ? false : true;

  return {
    theme: isDarkTheme ? 'dark' : 'light',
    backgroundColor: root
      .getPropertyValue(isDarkTheme ? '--chart-dark-bg' : '--chart-light-bg')
      .trim(),
    gridColor: root
      .getPropertyValue(
        isDarkTheme ? '--chart-dark-border' : '--chart-light-border',
      )
      .trim(),
  };
}
