namespace Shipping.API.Enums
{
    public enum ResponseStatus
    {
        ErrorNullValue = -1,
        Success = 0,
        ErrorUsernameExist = 1,
        ErrorUsernameNotExist = 2,
        ErrorEmailExist = 3,
        ErrorPasswordIncorrect = 4,
        ErrorOrderNotExist = 5,
        ErrorEmailIncorrect = 6
    }
}
