select * from [dbo].[User];
select * from [dbo].[Order];
select * from [dbo].[ShippingRegistration];

select [Order].SelectedShipperId from [dbo].[Order] where [Order].OrderName = 'dien thoai 1';

select * from [dbo].[User] where UserId in (select ShopId from [dbo].[Order] where OrderName = 'ad')

select *
from INFORMATION_SCHEMA.COLUMNS
where TABLE_NAME='ShippingRegistration'

update [dbo].[Order] set Status = 1 where OrderId = 1012;

update [dbo].[Order] set StartTime = DATEADD(HOUR, 7, StartTime) where OrderId > 1000;