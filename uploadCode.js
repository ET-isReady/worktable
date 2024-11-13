<NavigationContainer>
{/* <AuthStack /> */}
{ token === null || token === '' ? <AuthStack /> : <MainStack /> }
</NavigationContainer>