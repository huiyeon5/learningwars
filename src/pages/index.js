import React from 'react'
import { graphql,navigate } from 'gatsby'
import Layout from '../components/layout' 
import SEO from '../components/seo'
import indexStyles from './index.module.css'
import Img from "gatsby-image"

class IndexPage extends React.Component {
  render() {
    const postList = this.props.data.allMarkdownRemark;
    return(
        <Layout>
          <SEO title="Home" keywords={[`Learning Wars`, `Blog`, `Learn`, `Teach`, `Tech`]} />
          <div>
            {postList.edges.map(({node}, i) => (
              <div className={indexStyles.postBox} key={i} >
                <div style={{width:`100%`, height:`100%`}}>
                  <div className={indexStyles.postGrid}>
                    <Img className={indexStyles.postImage} sizes={node.frontmatter.cover_image.childImageSharp.sizes} onClick={() => navigate(node.frontmatter.path)}/>
                    <h2 className={indexStyles.postHeader} onClick={() => navigate(node.frontmatter.path)}>{node.frontmatter.title}</h2>
                    <div className={indexStyles.postAuthor}>
                      <span>{node.frontmatter.date}</span>
                      <span>Written By: <div onClick={() => {navigate(`/author-blogs/${node.frontmatter.author.split(" ").join("_")}`); return true;}} className={indexStyles.postAuthorName} role="link">{node.frontmatter.author}</div></span>
                    </div>
                    <p className={indexStyles.postExcerpt} onClick={() => navigate(node.frontmatter.path)}>{node.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Layout>
    )
  }
}

export default IndexPage

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title
            author
            path
            cover_image {
                publicURL
                childImageSharp {
                    sizes(maxWidth: 1240) {
                        srcSet
                    }
                }
            }
          }
        }
      }
    }
  }`