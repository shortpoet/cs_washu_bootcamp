
Dim WS as Worksheet
    For Each WS in ActiveWorkbook.Worksheets
    WS.Activate
        
        Dim tickerSymbol as String
        Dim totalStockVolume as Variant
        totalStockVolume = 0

        Dim countColumn as Integer
        countColumn = 1
        Dim countRow as Integer
        countRow = 1
        Dim currentSummaryRow as Integer
        currentSummaryRow = countRow + 1
        lastRow = WS.Cells(Rows.Count, 1).End(xlUp).Row

        Cells (countRow, countColumn + 8).Value = "Ticker"
        Cells (countRow, countColumn + 9).Value = "Total Stock Volume"         

        For i = 2 to lastRow
            
            If Cells(i, countColumn).Value <> Cells(i + 1, countColumn).Value Then
                tickerSymbol = Cells(i, countColumn).Value
                Cells(currentSummaryRow, countColumn + 8).Value = tickerSymbol
               
                totalStockVolume = totalStockVolume + Cells(i, countColumn + 6).Value
                Cells(currentSummaryRow, countColumn + 9).Value = totalStockVolume
                
                currentSummaryRow = currentSummaryRow + 1
                totalStockVolume = 0

            Else
                totalStockVolume = totalStockVolume + Cells(i, 7).Value
                
            End If

        Next i

        
    Next WS


