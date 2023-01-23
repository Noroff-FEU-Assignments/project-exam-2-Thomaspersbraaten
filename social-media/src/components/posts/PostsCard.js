import * as React from "react";

import PostDate from "../moment/PostDate";
import { Link } from "react-router-dom";
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function PostsCard({ post }) {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <></>
    // <Card sx={{ maxWidth: 345 }} key={post.id} className="post">
    //   {/* <CardHeader
    //     // avatar={
    //     //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
    //     //     R
    //     //   </Avatar>
    //     // }
    //     avatar={post.author.avatar ? <Avatar src={post.author.avatar}></Avatar> : <Avatar></Avatar>}
    //     // action={
    //     //   <IconButton aria-label="settings">
    //     //     <MoreVertIcon />
    //     //   </IconButton>
    //     // }
    //     title={post.title}
    //     subheader={<PostDate date={post.created} />}
    //   /> */}
    //   {post.author ? (
    //     <CardHeader avatar={post.author.avatar ? <Avatar src={post.author.avatar}></Avatar> : <Avatar></Avatar>} title={<Link to={`/profiles/${post.author.name}`}>{post.author.name}</Link>} />
    //   ) : (
    //     ""
    //   )}
    //   {/* subheader={<PostDate date={post.created} />} */}
    //   {/* <CardHeader
    //     avatar={post.author.avatar ? <Avatar src={post.author.avatar}></Avatar> : <Avatar></Avatar>}
    //     title={<Link to={`/profiles/${post.author.name}`}>{post.author.name}</Link>}
    //     subheader={<PostDate date={post.created} />}
    //   /> */}
    //   {/* <CardMedia component="img" height="194" image={post.media} alt={post.title} /> */}
    //   <Link to={`/posts/${post.id}`}>
    //     <CardContent>
    //       <PostDate date={post.created} />
    //     </CardContent>
    //     <CardContent>
    //       <Typography variant="h2" color="text.secondary">
    //         {post.title}
    //       </Typography>
    //     </CardContent>
    //     <CardContent>
    //       <Typography variant="body2" color="text.secondary">
    //         {post.body}
    //       </Typography>
    //     </CardContent>
    //     <CardMedia component="img" image={post.media} alt={post.title} />
    //   </Link>

    //   <CardActions>
    //     <IconButton aria-label="add to favorites">
    //       <CommentIcon />
    //       <CardContent>
    //         <Typography variant="body2" color="text.secondary">
    //           {post._count.comments}
    //         </Typography>
    //       </CardContent>
    //     </IconButton>
    //     <IconButton aria-label="share">
    //       <AddReactionIcon />
    //       <CardContent>
    //         <Typography variant="body2" color="text.secondary">
    //           {post._count.reactions}
    //         </Typography>
    //       </CardContent>
    //     </IconButton>
    //   </CardActions>
    //   {/* <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
    //       <ExpandMoreIcon />
    //     </ExpandMore> */}
    //   {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
    //     <CardContent>
    //       <Typography paragraph>Method:</Typography>
    //       <Typography paragraph>Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.</Typography>
    //       <Typography paragraph>
    //         Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8
    //         minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring
    //         often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
    //       </Typography>
    //       <Typography paragraph>
    //         Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low,
    //         add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any
    //         mussels that don&apos;t open.)
    //       </Typography>
    //       <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
    //     </CardContent>
    //   </Collapse> */}
    // </Card>
  );
}
