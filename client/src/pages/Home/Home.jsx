import { Symbols, Post } from "../../components";
import "./Home.css";

function Home() {
  const create_post = async()=>{
    const content= {
      username:'1234',
      imageId:'9089',
      content:'hello',
      description:'nice one buddy',
    };
  
    await fetch('/createpost',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(content),
    }) .then((res) => {
      return res.json();
    }) 
  }

  const delete_post = async()=>{
    const imageId={
      imageId:'9089',
    }
    await fetch('/deletepost',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(imageId),
    })
  }

  return (
    <div className="Home">
      <div className="posts">
        <Post />
        <Post />
      </div>
      <div className="createPostButton">
        <Symbols.Plus size="38" />
      </div>
      <button onClick={create_post}>click</button>
  <button onClick={delete_post}>delete</button>
    </div>
  );
}

export default Home;
