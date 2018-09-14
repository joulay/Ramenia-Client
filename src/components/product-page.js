import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import neoguri from '../styles/images/neoguri.jpeg';

class ProductPage extends React.Component {

    render() {
        const reviews = ['Greg', 'Test', 'Dummy'];
        const buildJSX = reviews.map((review) => {
            return (
                <li className="product-page__reviews__li">
                    <span className="product-page__reviews__rating">XXXXX</span>
                    <p>{review} on 9/12/2018</p>
                    <p>
                    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
                    </p>
                </li>
            )
        })

        return (
            <section className="product-page">
                <div className="product-page__main container">
                    <div className="product-page__main__left">
                        <img className="product-page__main__favorite" src="http://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-Favorite-Heart-icon.png" />
                        <img className="product-page__main__image" src={neoguri} />
                        <span className="product-page__main__user-rating">XXXXX</span>
                    </div>
                    <div className="product-page__main__right">
                        <p className="product-page__main__number-rating">4.7</p>
                        <span className="product-page__main__wrap">
                            <span className="product-page__main__total-rating">XXXXX</span>
                            <p>302 Reviews</p>
                        </span>
                    </div>
                </div>
                <div className="product-page__reviews container">
                    <ul className="product-page__reviews__ul">
                        {buildJSX}
                    </ul>
                </div>
            </section>
        
    )
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    currentUser: state.auth.currentUser,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(ProductPage));
