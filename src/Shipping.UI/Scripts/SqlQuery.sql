select * from [dbo].[User] where UserId = 2;
select * from [dbo].[Order] where OrderId = 1027;
select * from [dbo].[ShippingRegistration];
select * from [dbo].[ReviewsShipper];

delete from [dbo].[ReviewsShipper]

select [Order].SelectedShipperId from [dbo].[Order] where [Order].OrderName = 'dien thoai 1';

select * from [dbo].[User] where UserId in (select ShopId from [dbo].[Order] where OrderName = 'ad')

select distinct TABLE_NAME from INFORMATION_SCHEMA.COLUMNS

update INFORMATION_SCHEMA.COLUMNS set NUMERIC_SCALE = 1 where TABLE_NAME='User' and COLUMN_NAME = 'Score'

ALTER TABLE [dbo].[User] ALTER COLUMN Score decimal(18,1)

update [dbo].[Order] set Status = 2 where OrderId = 6;

update [dbo].[Order] set StartTime = DATEADD(HOUR, 7, StartTime) where OrderId > 1000;

insert into [dbo].[Order] (
	OrderName,
	ShopId,
	StartingPoint,
	Destination,
	StartTime,
	RecipientsName,
	RecipientsPhoneNumber,
	AdvanceDeposit,
	Profit,
	SelectedShipperId,
	[Status])
values (
	'test 2',
	1,
	'hanoi, vietnam',
	'danang, vietnam',
	'20170430 01:14:00 AM',
	'ten 1',
	'123',
	555,
	555,
	2,
	2
);

update [dbo].[Order] set ShopId = 4 where OrderId = 9

SELECT 
    [Extent1].[OrderId] AS [OrderId]
    FROM [dbo].[Order] AS [Extent1]
    WHERE ([Extent1].[SelectedShipperId] = 2) OR (([Extent1].[SelectedShipperId] IS NULL) AND (2 IS NULL))

select * from "user"

DECLARE 
       @SQL NVARCHAR(MAX)
     , @TableName SYSNAME = '[dbo].[User]'

SELECT @SQL = 'SELECT STUFF((SELECT
' + STUFF((
     SELECT [text()] = '+ ''N''''''' + ' + ISNULL(CAST([' + c.name + '] AS NVARCHAR(MAX)), '''') + '''''', ''' + CHAR(10)
     FROM sys.columns c
     WHERE c.[object_id] = OBJECT_ID('[dbo].[User]')
          AND c.user_type_id = c.system_type_id
FOR XML PATH('')), 1, 2, '  ') + ' + CHAR(10)
FROM ' + @TableName + '
FOR XML PATH('''')), 1, 0, '''')'

PRINT @SQL

DECLARE @temp TABLE (t NVARCHAR(MAX))

INSERT INTO @temp
EXEC sys.sp_executesql @SQL

DECLARE @SQL2 NVARCHAR(MAX)

SELECT @SQL2 = t
FROM @temp

PRINT @SQL2

DECLARE @a  NVARCHAR(MAX);
SELECT @a = STUFF((SELECT
  'N''' + ISNULL(CAST([UserId] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([FullName] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([Username] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([Password] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([Email] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([PhoneNumber] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([BirthDay] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([Gender] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([UserType] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([ShopName] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([ShopAddress] AS NVARCHAR(MAX)), '') + ''', '
+ 'N''' + ISNULL(CAST([Score] AS NVARCHAR(MAX)), '') + ''', '
 + CHAR(10)
FROM [dbo].[User]
FOR XML PATH('')), 1, 0, '');

PRINT @a;

select * from [User] u join [Order] o on u.UserId = o.SelectedShipperId join ReviewsShipper r on o.OrderId = r.OrderId;
select * from [User] u join [Order] o on u.UserId = o.ShopId join ReviewsShipper r on o.OrderId = r.OrderId;
select * from ReviewsShipper;

var listOrderId = entities.ShippingRegistrations
                        .Where(r => r.ShipperId == id)
                        .Select(r => r.OrderId);

                var listOrder = entities.Orders
                    .Where(o => listOrderId.Contains(o.OrderId))
                    .ToList();


select * from "order" o left join shippingregistration s on o.orderid = s.orderid where s.shipperid = 2

from o in entities.Orders join r in entities.ShippingRegistrations on o.OrderId equal r.OrderId where r.ShipperId == id && o.Status != (int)OrderStatus.Expired && o.Status != (int)OrderStatus.Canceled select o;