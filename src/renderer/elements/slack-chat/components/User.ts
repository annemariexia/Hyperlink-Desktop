export class User {
  public name: string
  public color: string
  public id: string
  public real_name: string
  public image: string

  constructor(args) {
    this.name = args.name
    this.color = args.color
    this.id = args.id
    this.real_name = args.real_name || args.name
    // sizes available: image_24, image_32, image_48, image_72, image_192, image_512
    this.image = args.profile.image_48
  }
}
