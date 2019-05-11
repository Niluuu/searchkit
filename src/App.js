import React from 'react'
import { 
  SearchBox, 
  SearchkitComponent,
  Hits,
  HitItem,
  Pagination,
  RefinementListFilter,
  Layout,
  TopBar,
  LayoutResults,
  LayoutBody,
  SideBar,
  RangeFilter,
  SelectedFilters,
  CheckboxFilter,
  RangeQuery,
  TermQuery
} from 'searchkit'
import {get} from 'lodash'


export default class App extends SearchkitComponent {
  render() {

    const HitItem = (props) => {
      let url =  "http://www.imdb.com/title/" + props.result._source.imdbId

     return ( <div className={props.bemBlocks.item().mix(props.bemBlocks.container("item"))}>
                <a href={url}>
                  <img data-qa="poster" className={props.bemBlocks.item("poster")} src={props.result._source.poster} width="170" height="240"/>
                  <div data-qa="title" className={props.bemBlocks.item("title")} dangerouslySetInnerHTML={{__html: get(props.result,"highlight.title",props.result._source.title)}}></div>
                </a>
              </div>  
      )
    }

    const RefinementOption = (props) => (
      <div className={props.bemBlocks.option().state({selected:props.selected}).mix(props.bemBlocks.container("item"))} onClick={props.onClick}>
        <div className={props.bemBlocks.option("text")}>{props.label}</div>
        <div className={props.bemBlocks.option("count")}>{props.count}</div>
      </div>
    )

    const SelectedFilter = (props) => (
      <div className={props.bemBlocks.option()
        .mix(props.bemBlocks.container("item"))
        .mix(`selected-filter--${props.filterId}`)()}>
        <div className={props.bemBlocks.option("name")}>{props.labelKey}: {props.labelValue}</div>
        <div className={props.bemBlocks.option("remove-action")} onClick={props.removeFilter}>x</div>
      </div>
    )
       
    return (
      <div>
        <Layout>  
          <TopBar>
           <SearchBox 
            searchOnChange={true}
            querOptions={{analyzer: "standard"}}
            queryFields={["title^5", "languages", "text"]}
            />
          </TopBar>
          <LayoutBody>
            <SideBar>
             <RefinementListFilter 
                field="languages.raw"
                title="Lenguages"
                id="lenguages" itemComponent={RefinementOption}
              />
              <RangeFilter field="metaScore" id="metascore" min={0} max={100} showHistogram={false} title="MetaScore"/>
              
              <CheckboxFilter id="old-moves" title="Movile filter" label="Old movies" filter={
                Boolean([
                  RangeQuery("year", {lt: 1970}),
                  TermQuery("type.raw", "Movie")
                ])
              } />
              <CheckboxFilter id="recent" title="Date" label="Recent" filter={RangeQuery("year", {gt: 2012})}/>
            </SideBar>
            <LayoutResults>
              <SelectedFilters/>
              <Hits 
              mod="sk-hits-grid"
              hitsPerPage={50} 
              highlightFields={["title"]} 
              sourceFilter={["title", "poster", "imdbId"]}
              itemComponent={HitItem}
              />
              <Pagination showNumbers={true}/>
            </LayoutResults>
          </LayoutBody>
        </Layout>
       
       
       
      </div>
    )
  }
  
}



