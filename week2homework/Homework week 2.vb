
 'Dim filehandle As Integer

       ' filehandle = FreeFile()
        'Open "C:\Users\soria\WASHSTL201809DATA3\02-VBA-Scripting\Homework\Instructions\Resources\log\log.txt" For Output As #filehandle


Dim WS as Worksheet
    For Each WS in ActiveWorkbook.Worksheets
    WS.Activate
        Dim tickerSymbol as String
        Dim totalStockVolume as Variant
        totalStockVolume = 0

        Dim yearOpen as Variant
        yearOpen = 0
        Dim yearClose as Variant
        yearClose = 0
        Dim yearlyChange as Variant
        yearlyChange = 0
        Dim percentChange as Variant
        percentChange = 0
        Dim greatestPercIncr as Variant
        greatestPercIncr = 0
        Dim greatestPercDecr as Variant
        greatestPercDecr = 0
        Dim greatestTotalVol as Variant
        greatestTotalVol = 0

        Dim countColumn as Integer
        countColumn = 1
        Dim countRow as Integer
        countRow = 1
        Dim currentSummaryRow as Integer
        currentSummaryRow = countRow + 1
        lastColumn = WS.Cells(1, Columns.Count).End(xlToLeft).Column
        lastRow = WS.Cells(Rows.Count, 1).End(xlUp).Row

        Dim buffer As String
       


        Cells (countRow, countColumn + 8).Value = "Ticker"
        Cells (countRow, countColumn + 9).Value = "Yearly Change"
        Cells (countRow, countColumn + 10).Value = "Percent Change"
        Cells (countRow, countColumn + 11).Value = "Total Stock Volume"
        Cells (countRow, countColumn + 14).Value = "Ticker"
        Cells (countRow, countColumn + 15).Value = "Value"
        Cells (countRow + 1, countColumn + 13).Value = "Greatest % Increase"
        Cells (countRow + 2, countColumn + 13).Value = "Greatest % Decrease"
        Cells (countRow + 3, countColumn + 13).Value = "Greatest Total Volume"

        'Debug.Print("Worksheet: " + ActiveWorkbook))

        yearOpen = Cells(countRow + 1, countColumn + 2).Value

        For i = 2 to lastRow
            
            If Cells(i, countColumn).Value <> Cells(i + 1, countColumn).Value Then
                tickerSymbol = Cells(i, countColumn).Value
                Cells(currentSummaryRow, countColumn + 8).Value = tickerSymbol
                yearClose = Cells(i, countColumn + 5).Value
                yearlyChange = yearClose - yearOpen
                Cells(currentSummaryRow, countColumn + 9).Value = yearlyChange
                
                buffer = ("yearOpen: " + str(yearOpen) + "\nyearClose: " + str(yearClose) + "\nrow: " + str(i) + " -- column: " + str(countColumn))
                Debug.Print (buffer)
                'Print(#filehandle, buffer)

                If (yearOpen = 0 And yearClose = 0) Then
                    percentChange = 0
                ElseIf (yearOpen = 0 And yearClose <> 0) Then 
                    percentChange = "n/a"
                Else 
                    percentChange = yearlyChange / yearOpen
                    Cells(currentSummaryRow, countColumn + 10).Value = percentChange
                    Cells(currentSummaryRow, countColumn + 10).NumberFormat = "0.00%"
                End If
                totalStockVolume = totalStockVolume + Cells(i, countColumn + 6).Value
                Cells(currentSummaryRow, countColumn +11).Value = totalStockVolume
                yearOpen = Cells(i + 1, countColumn + 2).Value
                currentSummaryRow = currentSummaryRow + 1
                totalStockVolume = 0
            Else
                totalStockVolume = totalStockVolume + Cells(i, 7).Value
            End If

        Next i

        yCLastRow = WS.Cells(Rows.Count, countColumn + 8).End(xlUp).Row

        For j = 2 to yCLastRow
            If Cells(j, countColumn + 9) > 0 Then
                Cells(j, countColumn + 9).Interior.ColorIndex = 4
            Elseif Cells(j, countColumn + 9) < 0 Then
                Cells(j, countColumn + 9).Interior.ColorIndex = 3
            Else
            End If
        Next j



        For k = 2 to yCLastRow
            If Cells(k, countColumn + 10).Value =  Application.WorksheetFunction.Max(WS.Range("K2:K" & yCLastRow)) Then
                Cells(countRow + 1, countColumn + 16).Value = Cells(k, countColumn + 10).Value
                Cells(countRow + 1, countColumn + 15).Value = Cells(k, countColumn + 8).Value
                Cells(countRow + 1, countColumn + 16).NumberFormat = "0.00%"
            ElseIf Cells(k, countColumn + 10).Value =  Application.WorksheetFunction.Min(WS.Range("K2:K" & yCLastRow)) Then
                Cells(countRow + 2, countColumn + 16).Value = Cells(k, countColumn + 10).Value
                Cells(countRow + 2, countColumn + 15).Value = Cells(k, countColumn + 8).Value
                Cells(countRow + 2, countColumn + 16).NumberFormat = "0.00%"
            ElseIf Cells(k, countColumn + 11).Value =  Application.WorksheetFunction.Max(WS.Range("L2:L" & yCLastRow)) Then
                Cells(countRow + 3, countColumn + 16).Value = Cells(k, countColumn + 11).Value
                Cells(countRow + 3, countColumn + 15).Value = Cells(k, countColumn + 8).Value
            End If
        Next k

    Next WS
'Close #filehandle

