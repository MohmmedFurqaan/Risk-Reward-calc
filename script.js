document.getElementById('calculateBtn').addEventListener('click', function() {
    const sharePrice = parseFloat(document.getElementById('sharePrice').value);
    const portfolioSize = parseFloat(document.getElementById('portfolioSize').value);
    const positionSize = parseFloat(document.getElementById('positionSize').value) / 100;
    const stopLoss = parseFloat(document.getElementById('stopLoss').value) / 100;

    // Validate inputs
    if (isNaN(sharePrice) || isNaN(portfolioSize) || isNaN(positionSize) || isNaN(stopLoss)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    // Calculate amount to invest and shares to buy
    const amtPosition = portfolioSize * positionSize;
    const sharesToBuy = Math.floor(amtPosition / sharePrice);

    // Avoid division by zero
    if (sharesToBuy === 0) {
        alert('You cannot buy 0 shares. Adjust your inputs.');
        return;
    }

    const stopAmount = amtPosition * stopLoss;
    const stopPrice = sharePrice - stopAmount / sharesToBuy;

    // Update results
    document.getElementById('amtPosition').innerText = amtPosition.toFixed(2);
    document.getElementById('sharesToBuy').innerText = sharesToBuy;
    document.getElementById('stopAmount').innerText = stopAmount.toFixed(2);
    document.getElementById('stopPrice').innerText = stopPrice.toFixed(2);
    document.getElementById('riskEquity').innerText = (stopAmount / portfolioSize * 100).toFixed(2) + '%';

    // Risk-Reward Calculation
    const risk = stopAmount / amtPosition;
    const gains = Array.from({ length: 6 }, (_, i) => risk * (i + 1)); // Generates gains for 1R to 6R

    // Update table with gains
    const gainCells = document.querySelectorAll('table tbody tr td');
    gainCells.forEach((cell, index) => {
        if (index < gains.length) {
            cell.innerText = gains[index].toFixed(2);
        }
    });

    document.getElementById('gain').innerText = ((gains[0] - stopAmount) / stopAmount * 100).toFixed(2) + '%';
});