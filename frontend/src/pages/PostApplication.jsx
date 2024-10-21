
import { useSelector } from 'react-redux'

const PostApplication = () => {
  const {singleJob} = useSelector((state) => state.jobs)
  const {isAutheticated, user} = useSelector((state) => state.user)
  return (
    <>

    </>
  )
}

export default PostApplication
