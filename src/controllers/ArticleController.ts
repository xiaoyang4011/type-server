import { JsonController, Param, Body, Get, Post, Put, Delete, QueryParam } from "routing-controllers";
import { Inject } from "typedi";
import { Article } from "../entities/article"
import { ArticleService } from "../services/ArticleService"

@JsonController("/articles")
export class ArticleController {

	@Inject()
	articleService: ArticleService;

	@Post("/")
	post( @Body({ required: true }) article: Article): Promise<Article> {
		return this.articleService.insert(article);
	}
}