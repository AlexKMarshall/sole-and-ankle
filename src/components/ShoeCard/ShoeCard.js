import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant !== "default" ? (
            <Flag
              style={{
                "--background-color":
                  variant === "on-sale" ? COLORS.primary : COLORS.secondary,
              }}
            >
              {variant === "on-sale" ? "Sale" : "Just released!"}
            </Flag>
          ) : null}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const Flag = styled.div`
  --background-color: ${COLORS.primary};
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
  background-color: var(--background-color);
  position: absolute;
  padding: 7px 9px 9px 11px;
  top: 12px;
  right: -4px;
  border-radius: 2px;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
