import * as H from 'history';
import * as React from 'react';
import { match, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { WithDefaultProps } from '../core/default';
import { AlbumDetail } from './component/album-detail';
import { AlbumsForm } from './component/albums-form';
import { ArticleForm } from './component/article-form';
import { ArticlesForm } from './component/articles-form';
import { ContentCategoriesForm } from './component/content-categories-form';
import { ContentCategoryForm } from './component/content-category-form';
import { ContentImages } from './component/content-image';
import { ContentImageForm } from './component/content-image-form';
import { DriveForm } from './component/drive-form';
import { DrivesForm } from './component/drives-form';
import { PreviewImageForm } from './component/preview-image-form';

interface StateProps {
  anyProps?: any;
  match: match;
}

interface AppProps {
  history: H.History;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    const currentUrl = this.props.match.url;
    return (
      <React.Fragment>
        <Route path={currentUrl + '/content-category/:action/:id'} exact={true} component={WithDefaultProps(ContentCategoryForm)} />
        <Route path={currentUrl + '/content-category/:action'} exact={true} component={WithDefaultProps(ContentCategoryForm)} />
        <Route path={currentUrl + '/content-category'} exact={true} component={WithDefaultProps(ContentCategoriesForm)} />
        <Route path={currentUrl + '/drive/:action/:id'} exact={true} component={WithDefaultProps(DriveForm)} />
        <Route path={currentUrl + '/drive/:action'} exact={true} component={WithDefaultProps(DriveForm)} />
        <Route path={currentUrl + '/drive'} exact={true} component={WithDefaultProps(DrivesForm)} />
        <Route path={currentUrl + '/db'} exact={true} component={WithDefaultProps(DrivesForm)} />

        <Route path={currentUrl + '/content-image/:action/:id'} exact={true} component={WithDefaultProps(ContentImageForm)} />
        <Route path={currentUrl + '/content-image/:action'} exact={true} component={WithDefaultProps(ContentImageForm)} />
        <Route path={currentUrl + '/content-image'} exact={true} component={WithDefaultProps(ContentImages)} />
        <Route path={currentUrl + '/album/'} exact={true} component={WithDefaultProps(AlbumsForm)} />
        <Route path={currentUrl + '/album/:id'} exact={true} component={WithDefaultProps(AlbumDetail)} />
        <Route path={currentUrl + '/album/preview/:id/:idStream'} exact={true} component={WithDefaultProps(PreviewImageForm)} />
        <Route path={currentUrl + '/articles/:action/:id'} exact={true} component={WithDefaultProps(ArticleForm)} />
        <Route path={currentUrl + '/articles/:action'} exact={true} component={WithDefaultProps(ArticleForm)} />
        <Route path={currentUrl + '/articles/'} exact={true} component={WithDefaultProps(ArticlesForm)} />
        {/* // create update comment */}
      </React.Fragment>
    );
  }
}

export const ContentRoutes = compose(
  withRouter,
)(StatelessApp);
export default ContentRoutes;

