import app from './app.js';

const port = process.env.PORT || 3000 ; 
app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
})