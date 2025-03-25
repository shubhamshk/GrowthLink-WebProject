//i created this file becuase typescript cant reconize any .css files other 
// and ts and tsx and it was showing error which makes it diffuclt to deploy

declare module "*.css" {
    const content: Record<string, string>;
    export default content;
  }