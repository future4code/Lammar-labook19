import { app } from "./app"
import { userRouter } from './routes/UserRouter';
import { postRouter } from './routes/PostRouter';

app.use("/user", userRouter)

app.use("/post", postRouter)
